const Match = require('../models/Match');
const Item = require('../models/Item');
const MatchingService = require('../services/matchingService');
const SmartMatchingEngine = require('../services/matchingEngine');

// @desc    Get all potential matches for current user or filtered criteria
// @route   GET /api/matches
// @access  Private / Public fallback
const getMatches = async (req, res, next) => {
  try {
    const { status, minScore, lostItemId, foundItemId } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (minScore) filter.finalScore = { $gte: Number(minScore) };
    if (lostItemId) filter.lostItem = lostItemId;
    if (foundItemId) filter.foundItem = foundItemId;

    // If non-admin user, filter matches involving items owned by the user
    if (req.user && req.user.role !== 'admin' && !lostItemId && !foundItemId) {
      const userItems = await Item.find({ user: req.user._id }).select('_id');
      const userItemIds = userItems.map((item) => item._id);
      filter.$or = [{ lostItem: { $in: userItemIds } }, { foundItem: { $in: userItemIds } }];
    }

    const matches = await Match.find(filter)
      .populate('lostItem', 'title category description location date color brand identifyingMarks images status user type')
      .populate('foundItem', 'title category description location date color brand identifyingMarks images status user type')
      .sort({ finalScore: -1, createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: matches.length,
      matches
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get legacy/my-matches format for backward compatibility
// @route   GET /api/matches/my-matches
// @access  Private
const getMyMatches = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : req.query.userId;
    if (!userId) {
      return res.status(200).json({ status: 'success', count: 0, userMatches: [] });
    }

    const userItems = await Item.find({ user: userId }).select('_id title type');
    const userItemIds = userItems.map((item) => item._id);

    const matches = await Match.find({
      $or: [{ lostItem: { $in: userItemIds } }, { foundItem: { $in: userItemIds } }]
    })
      .populate('lostItem', 'title category description location date color brand images status type')
      .populate('foundItem', 'title category description location date color brand images status type')
      .sort({ finalScore: -1 });

    // Group matches by user item
    const matchesMap = new Map();
    matches.forEach((m) => {
      const isMyLost = userItemIds.some((id) => id.toString() === m.lostItem._id.toString());
      const myItemObj = isMyLost ? m.lostItem : m.foundItem;
      const matchedItemObj = isMyLost ? m.foundItem : m.lostItem;

      if (!matchesMap.has(myItemObj._id.toString())) {
        matchesMap.set(myItemObj._id.toString(), {
          myItem: {
            _id: myItemObj._id,
            title: myItemObj.title,
            type: myItemObj.type
          },
          matches: []
        });
      }

      matchesMap.get(myItemObj._id.toString()).matches.push({
        _id: m._id,
        matchedItem: matchedItemObj,
        confidenceScore: m.finalScore,
        matchLevel: m.matchLevel,
        reasons: m.reasons,
        differences: m.differences,
        status: m.status,
        scores: {
          semantic: m.semanticScore,
          category: m.categoryScore,
          name: m.nameScore,
          color: m.colorScore,
          brand: m.brandScore,
          feature: m.featureScore,
          location: m.locationScore,
          date: m.dateScore
        },
        evaluatedAt: m.updatedAt
      });
    });

    res.status(200).json({
      status: 'success',
      count: matchesMap.size,
      userMatches: Array.from(matchesMap.values())
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single match details by Match ID
// @route   GET /api/matches/:id
// @access  Private / Public
const getMatchById = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate({
        path: 'lostItem',
        select: 'title category description location date color brand identifyingMarks images status user type',
        populate: { path: 'user', select: 'fullName email department year' }
      })
      .populate({
        path: 'foundItem',
        select: 'title category description location date color brand identifyingMarks images status user type',
        populate: { path: 'user', select: 'fullName email department year' }
      });

    if (!match) {
      res.status(404);
      throw new Error('Match record not found');
    }

    res.status(200).json({
      status: 'success',
      match: {
        _id: match._id,
        finalScore: match.finalScore,
        matchLevel: match.matchLevel,
        status: match.status,
        reasons: match.reasons,
        differences: match.differences,
        scores: {
          semantic: match.semanticScore,
          category: match.categoryScore,
          name: match.nameScore,
          color: match.colorScore,
          brand: match.brandScore,
          feature: match.featureScore,
          location: match.locationScore,
          date: match.dateScore
        },
        lostItem: match.lostItem,
        foundItem: match.foundItem,
        createdAt: match.createdAt,
        updatedAt: match.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get matches for a specific lost item
// @route   GET /api/matches/lost/:lostItemId
// @access  Private
const getMatchesByLostItem = async (req, res, next) => {
  try {
    const matches = await Match.find({ lostItem: req.params.lostItemId })
      .populate('foundItem', 'title category description location date color brand images status user')
      .sort({ finalScore: -1 });

    res.status(200).json({
      status: 'success',
      count: matches.length,
      matches
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get matches for a specific found item
// @route   GET /api/matches/found/:foundItemId
// @access  Private
const getMatchesByFoundItem = async (req, res, next) => {
  try {
    const matches = await Match.find({ foundItem: req.params.foundItemId })
      .populate('lostItem', 'title category description location date color brand images status user')
      .sort({ finalScore: -1 });

    res.status(200).json({
      status: 'success',
      count: matches.length,
      matches
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Evaluate match score on-demand without persistence
// @route   POST /api/matches/evaluate
// @access  Public
const evaluateMatch = async (req, res, next) => {
  try {
    const { lostItem, foundItem } = req.body;

    if (!lostItem || !foundItem) {
      res.status(400);
      throw new Error('Please provide both lostItem and foundItem objects');
    }

    const result = await MatchingService.evaluateMatchPair(lostItem, foundItem);

    res.status(200).json({
      status: 'success',
      finalScore: result.finalScore,
      matchLevel: result.matchLevel,
      scores: result.scores,
      reasons: result.reasons,
      differences: result.differences,
      evaluatedAt: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update match status (e.g. Viewed, ClaimStarted, Rejected, Resolved)
// @route   PUT /api/matches/:id/status
// @access  Private
const updateMatchStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Suggested', 'Viewed', 'ClaimStarted', 'Verified', 'Rejected', 'Resolved'];

    if (!status || !allowedStatuses.includes(status)) {
      res.status(400);
      throw new Error(`Invalid status. Allowed values: ${allowedStatuses.join(', ')}`);
    }

    const match = await Match.findById(req.params.id);
    if (!match) {
      res.status(404);
      throw new Error('Match record not found');
    }

    match.status = status;
    await match.save();

    res.status(200).json({
      status: 'success',
      message: `Match status updated to '${status}'`,
      match
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMatches,
  getMyMatches,
  getMatchById,
  getMatchesByLostItem,
  getMatchesByFoundItem,
  evaluateMatch,
  updateMatchStatus
};
