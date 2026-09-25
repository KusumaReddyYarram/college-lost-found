const Notification = require('../models/Notification');

/**
 * Notification Service Helper
 * Creates and persists user notifications for matches, claims, and status updates.
 */
class NotificationService {
  static async notify({ userId, title, message, type = 'system', relatedItem = null, relatedClaim = null }) {
    try {
      if (!userId) return null;

      const notification = await Notification.create({
        user: userId,
        title,
        message,
        type,
        relatedItem,
        relatedClaim
      });

      return notification;
    } catch (error) {
      console.error('NotificationService Error:', error.message);
      return null;
    }
  }
}

module.exports = NotificationService;
