const Item = require('../models/Item');
const SmartMatchingEngine = require('../services/matchingEngine');

// @desc    Evaluate match score between specific lost item and found item on demand
// @route   POST /api/matches/evaluate
// @access  Public
const evaluateMatch = async (req, res, next) => {
  try {
    const { lostItem, foundItem } = req.body;

    if (!lostItem || !foundItem) {
      res.status(400);
      throw new Error('Please provide both lostItem and foundItem objects');
    }

    const { confidenceScore, reasons } = SmartMatchingEngine.calculateMatchScore(
      lostItem,
      foundItem
    );

    res.status(200).json({
      status: 'success',
      confidenceScore,
      reasons,
      evaluatedAt: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all potential matches for current user's items
// @route   GET /api/matches/my-matches
// @access  Private
const getMyMatches = async (req, res, next) => {
  try {
    const userItems = await Item.find({ user: req.user._id })
      .populate('potentialMatches.matchedItem', 'title category location color brand type images date');

    const allMatches = [];
    userItems.forEach((item) => {
      if (item.potentialMatches && item.potentialMatches.length > 0) {
        allMatches.push({
          myItem: {
            _id: item._id,
            title: item.title,
            type: item.type
          },
          matches: item.potentialMatches
        });
      }
    });

    res.status(200).json({
      status: 'success',
      count: allMatches.length,
      userMatches: allMatches
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  evaluateMatch,
  getMyMatches
};
