const Claim = require('../models/Claim');
const Item = require('../models/Item');
const SuspiciousDetector = require('../services/suspiciousDetector');
const NotificationService = require('../services/notificationService');
const ActivityLogger = require('../services/activityLogger');

// @desc    Submit a claim for a found item with private verification answer & ownership score
// @route   POST /api/claims/submit
// @access  Private
const submitClaim = async (req, res, next) => {
  try {
    const { foundItemId, lostItemId, answerProvided } = req.body;

    if (!foundItemId || !answerProvided) {
      res.status(400);
      throw new Error('Please provide foundItemId and your private verification answer');
    }

    const foundItem = await Item.findById(foundItemId).select('+privateVerificationAnswer');
    if (!foundItem) {
      res.status(404);
      throw new Error('Target found item not found');
    }

    const claimerId = req.user ? req.user._id : req.body.claimerId;

    // Verify secret answer
    const cleanActual = (foundItem.privateVerificationAnswer || '').toLowerCase().trim();
    const cleanProvided = (answerProvided || '').toLowerCase().trim();

    const isExactMatch = cleanActual === cleanProvided;
    const isPartialMatch = cleanActual.includes(cleanProvided) || cleanProvided.includes(cleanActual);
    
    let evidenceMatchScore = 0;
    if (isExactMatch) evidenceMatchScore = 95;
    else if (isPartialMatch) evidenceMatchScore = 75;
    else evidenceMatchScore = 20;

    const isVerified = evidenceMatchScore >= 70;
    const claimConfidence = evidenceMatchScore >= 85 ? 'High' : evidenceMatchScore >= 60 ? 'Medium' : 'Low';

    // Evaluate suspicious claim risk
    const suspiciousFlag = await SuspiciousDetector.evaluateClaimRisk(claimerId, foundItemId, isVerified);

    const claim = await Claim.create({
      foundItem: foundItemId,
      lostItem: lostItemId || null,
      claimer: claimerId,
      answerProvided,
      evidenceMatchScore,
      identityVerified: true,
      claimConfidence,
      isVerified,
      suspiciousFlag,
      status: isVerified ? (suspiciousFlag.isSuspicious ? 'under_review' : 'approved') : 'rejected',
      reviewNotes: isVerified
        ? (suspiciousFlag.isSuspicious ? 'Ownership answer verified but claim flagged for manual staff review due to risk rules.' : 'Ownership verified automatically.')
        : 'Verification secret answer mismatch.'
    });

    // Update item status
    foundItem.status = isVerified ? 'claim_pending' : 'found';
    await foundItem.save();

    // Log Activity
    if (claimerId) {
      await ActivityLogger.log(claimerId, 'CLAIM_SUBMITTED', `Submitted claim for item: ${foundItem.title}`);
    }

    // Notify item finder/owner & claimant
    if (foundItem.user) {
      await NotificationService.notify({
        userId: foundItem.user,
        title: 'New Claim Received',
        message: `A student has submitted an ownership claim for your found item '${foundItem.title}'.`,
        type: 'claim',
        relatedItem: foundItem._id,
        relatedClaim: claim._id
      });
    }

    if (claimerId) {
      await NotificationService.notify({
        userId: claimerId,
        title: `Claim ${claim.status.replace('_', ' ').toUpperCase()}`,
        message: `Your claim for '${foundItem.title}' is currently ${claim.status.replace('_', ' ')}. Evidence match: ${evidenceMatchScore}%.`,
        type: 'claim',
        relatedItem: foundItem._id,
        relatedClaim: claim._id
      });
    }

    res.status(201).json({
      status: 'success',
      isVerified,
      evidenceMatchScore,
      claimConfidence,
      suspiciousFlag,
      message: isVerified
        ? 'Claim submitted and ownership verified successfully.'
        : 'Claim processed. The verification answer provided did not match item requirements.',
      claim
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all claims (filtered by user or role)
// @route   GET /api/claims
// @access  Private
const getClaims = async (req, res, next) => {
  try {
    const filter = {};

    // Students only see their own claims unless staff/admin
    if (req.user && !['staff', 'admin'].includes(req.user.role)) {
      filter.claimer = req.user._id;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.suspicious === 'true') {
      filter['suspiciousFlag.isSuspicious'] = true;
    }

    const claims = await Claim.find(filter)
      .populate('claimer', 'fullName email department year reputationScore')
      .populate('foundItem', 'title category location color brand images status')
      .populate('lostItem', 'title category location color brand images status')
      .populate('reviewedBy', 'fullName email role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: claims.length,
      claims
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Staff / Admin review and approve/reject claim
// @route   PUT /api/claims/:id/review
// @access  Private (Staff/Admin)
const reviewClaim = async (req, res, next) => {
  try {
    const { status, reviewNotes } = req.body;

    if (!['approved', 'rejected', 'under_review', 'cancelled'].includes(status)) {
      res.status(400);
      throw new Error('Invalid claim review status specified');
    }

    const claim = await Claim.findById(req.params.id).populate('foundItem').populate('lostItem');
    if (!claim) {
      res.status(404);
      throw new Error('Claim record not found');
    }

    claim.status = status;
    claim.reviewNotes = reviewNotes || claim.reviewNotes;
    claim.reviewedBy = req.user ? req.user._id : null;
    await claim.save();

    // Update item status if approved
    if (status === 'approved' && claim.foundItem) {
      claim.foundItem.status = 'recovered';
      await claim.foundItem.save();

      if (claim.lostItem) {
        claim.lostItem.status = 'recovered';
        await claim.lostItem.save();
      }
    }

    // Log Activity
    if (req.user) {
      await ActivityLogger.log(req.user._id, `CLAIM_${status.toUpperCase()}`, `Reviewed claim ${claim._id}`);
    }

    // Notify claimant
    if (claim.claimer) {
      await NotificationService.notify({
        userId: claim.claimer,
        title: `Claim ${status.toUpperCase()}`,
        message: `Staff has reviewed your claim for item '${claim.foundItem?.title || 'item'}': ${status}. ${reviewNotes || ''}`,
        type: 'claim',
        relatedItem: claim.foundItem?._id,
        relatedClaim: claim._id
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Claim status updated to ${status}`,
      claim
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitClaim,
  getClaims,
  reviewClaim
};
