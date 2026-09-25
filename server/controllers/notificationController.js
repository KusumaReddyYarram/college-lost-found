const Notification = require('../models/Notification');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : req.query.userId;
    if (!userId) {
      return res.status(400).json({ status: 'fail', message: 'User ID is required' });
    }

    const notifications = await Notification.find({ user: userId })
      .populate('relatedItem', 'title category type')
      .sort({ createdAt: -1 })
      .limit(30);

    const unreadCount = await Notification.countDocuments({ user: userId, read: false });

    res.status(200).json({
      status: 'success',
      unreadCount,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark single notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      res.status(404);
      throw new Error('Notification not found');
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({
      status: 'success',
      notification
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark all user notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
const markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : req.body.userId;
    if (!userId) {
      return res.status(400).json({ status: 'fail', message: 'User ID is required' });
    }

    await Notification.updateMany({ user: userId, read: false }, { read: true });

    res.status(200).json({
      status: 'success',
      message: 'All notifications marked as read'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead
};
