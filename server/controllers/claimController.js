const Claim = require('../models/Claim');
const Item = require('../models/Item');

// @desc    Submit a claim for a found item with private verification answer
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

    // Verify answer against found item's secret answer
    const cleanActual = foundItem.privateVerificationAnswer.toLowerCase().trim();
    const cleanProvided = answerProvided.toLowerCase().trim();

    const isMatch = cleanActual === cleanProvided || cleanActual.includes(cleanProvided) || cleanProvided.includes(cleanActual);

    const claim = await Claim.create({
      foundItem: foundItemId,
      lostItem: lostItemId || null,
      claimer: req.user ? req.user._id : req.body.claimerId,
      answerProvided,
      isVerified: isMatch,
      status: isMatch ? 'approved' : 'rejected',
      reviewNotes: isMatch
        ? 'Answer matched private verification secret. Claim approved.'
        : 'Answer did not match private verification secret.'
    });

    if (isMatch) {
      foundItem.status = 'recovered';
      await foundItem.save();

      if (lostItemId) {
        const lostItem = await Item.findById(lostItemId);
        if (lostItem) {
          lostItem.status = 'recovered';
          await lostItem.save();
        }
      }
    }

    res.status(201).json({
      status: 'success',
      isVerified: isMatch,
      message: isMatch
        ? 'Claim approved! Private ownership verified successfully.'
        : 'Claim rejected. The answer provided does not match the item owner secret.',
      claim
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitClaim
};
