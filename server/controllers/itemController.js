const Item = require('../models/Item');
const SmartMatchingEngine = require('../services/matchingEngine');
const DuplicateDetector = require('../services/duplicateDetector');
const NotificationService = require('../services/notificationService');
const ActivityLogger = require('../services/activityLogger');
const AIService = require('../services/aiService');

// @desc    Check if an item report might be a duplicate
// @route   POST /api/items/check-duplicate
// @access  Public
const checkDuplicateItem = async (req, res, next) => {
  try {
    const duplicateInfo = await DuplicateDetector.checkDuplicate(req.body);
    res.status(200).json({
      status: 'success',
      ...duplicateInfo
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Report a lost or found item & automatically execute Smart Matching
// @route   POST /api/items
// @access  Private (or Public fallback demo)
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
      category: category || AIService.suggestCategory(title + ' ' + description),
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

    // Log action
    if (userId) {
      await ActivityLogger.log(userId, `${type.toUpperCase()}_REPORT_CREATED`, `Created ${type} report: ${title}`);
    }

    // Automatically trigger Smart Matching against opposing items using MatchingService
    const MatchingService = require('../services/matchingService');
    const generatedMatches = await MatchingService.processItemMatching(newItem);

    // Fetch refreshed item with populated potentialMatches
    const refreshedItem = await Item.findById(newItem._id);

    res.status(201).json({
      status: 'success',
      message: `${type.toUpperCase()} item report created successfully`,
      item: refreshedItem || newItem,
      potentialMatchesCount: generatedMatches ? generatedMatches.length : 0
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all lost or found item reports with natural search & filters
// @route   GET /api/items
// @access  Public
const getItems = async (req, res, next) => {
  try {
    const { type, category, location, status, search, user: queryUserId } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (queryUserId) filter.user = queryUserId;
    if (location) filter.location = { $regex: location, $options: 'i' };

    if (search) {
      const parsed = AIService.parseNaturalSearch(search);
      const searchTerms = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { color: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];

      if (parsed.detectedColor) {
        searchTerms.push({ color: { $regex: parsed.detectedColor, $options: 'i' } });
      }

      filter.$or = searchTerms;
    }

    const items = await Item.find(filter)
      .populate('user', 'fullName email department year reputationScore')
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
      .populate('user', 'fullName email department year reputationScore')
      .populate('potentialMatches.matchedItem', 'title category location color brand type images date status');

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

// @desc    Update item report
// @route   PUT /api/items/:id
// @access  Private
const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error('Item report not found');
    }

    // Check ownership or staff/admin
    if (req.user && item.user.toString() !== req.user._id.toString() && !['staff', 'admin'].includes(req.user.role)) {
      res.status(403);
      throw new Error('Not authorized to update this item report');
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (req.user) {
      await ActivityLogger.log(req.user._id, 'ITEM_UPDATED', `Updated item ID: ${req.params.id}`);
    }

    res.status(200).json({
      status: 'success',
      message: 'Item updated successfully',
      item: updatedItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete item report
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error('Item report not found');
    }

    if (req.user && item.user.toString() !== req.user._id.toString() && !['staff', 'admin'].includes(req.user.role)) {
      res.status(403);
      throw new Error('Not authorized to delete this item report');
    }

    await item.deleteOne();

    if (req.user) {
      await ActivityLogger.log(req.user._id, 'ITEM_DELETED', `Deleted item ID: ${req.params.id}`);
    }

    res.status(200).json({
      status: 'success',
      message: 'Item report deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkDuplicateItem,
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
};
