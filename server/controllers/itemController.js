const Item = require('../models/Item');
const SmartMatchingEngine = require('../services/matchingEngine');

// @desc    Report a lost or found item & automatically execute Smart Matching
// @route   POST /api/items
// @access  Private (or Public demo with fallback user)
const createItem = async (req, res, next) => {
  try {
    const {
      type,
      title,
      category,
      description,
      location,
      date,
      color,
      brand,
      identifyingMarks,
      images,
      privateVerificationQuestion,
      privateVerificationAnswer
    } = req.body;

    if (!type || !title || !category || !description || !location || !privateVerificationAnswer) {
      res.status(400);
      throw new Error('Please fill all required item fields and private verification answer');
    }

    const userId = req.user ? req.user._id : req.body.userId;

    const newItem = await Item.create({
      type,
      title,
      category,
      description,
      location,
      date: date || Date.now(),
      color: color || '',
      brand: brand || '',
      identifyingMarks: identifyingMarks || '',
      images: images || [],
      user: userId,
      privateVerificationQuestion: privateVerificationQuestion || 'Describe one secret unmentioned detail about this item.',
      privateVerificationAnswer
    });

    // Automatically trigger Smart Matching against opposing items
    const opposingType = type === 'lost' ? 'found' : 'lost';
    const opposingItems = await Item.find({ type: opposingType, status: { $ne: 'recovered' } });

    const matches = [];

    for (const oppItem of opposingItems) {
      const lostItemObj = type === 'lost' ? newItem : oppItem;
      const foundItemObj = type === 'found' ? newItem : oppItem;

      const { confidenceScore, reasons } = SmartMatchingEngine.calculateMatchScore(
        lostItemObj,
        foundItemObj
      );

      if (confidenceScore >= 40) {
        matches.push({
          matchedItem: oppItem._id,
          confidenceScore,
          reasons
        });

        // Also add match to opposing item
        oppItem.potentialMatches.push({
          matchedItem: newItem._id,
          confidenceScore,
          reasons
        });
        oppItem.status = 'potential_match';
        await oppItem.save();
      }
    }

    if (matches.length > 0) {
      newItem.potentialMatches = matches;
      newItem.status = 'potential_match';
      await newItem.save();
    }

    res.status(201).json({
      status: 'success',
      message: `${type.toUpperCase()} item report created successfully`,
      item: newItem,
      potentialMatchesCount: matches.length
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all lost or found item reports
// @route   GET /api/items
// @access  Public
const getItems = async (req, res, next) => {
  try {
    const { type, category, location, search } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { color: { $regex: search, $options: 'i' } }
      ];
    }

    const items = await Item.find(filter)
      .populate('user', 'fullName email department year')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: items.length,
      items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single item details by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('user', 'fullName email department year')
      .populate('potentialMatches.matchedItem', 'title category location color brand type images');

    if (!item) {
      res.status(404);
      throw new Error('Item report not found');
    }

    res.status(200).json({
      status: 'success',
      item
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById
};
