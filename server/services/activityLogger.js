const ActivityLog = require('../models/ActivityLog');

/**
 * Audit Logger Service
 * Records system actions for security audit trail.
 */
class ActivityLogger {
  static async log(userId, action, details = '', ipAddress = '') {
    try {
      await ActivityLog.create({
        user: userId || null,
        action,
        details,
        ipAddress
      });
    } catch (error) {
      console.error('ActivityLogger Error:', error.message);
    }
  }
}

module.exports = ActivityLogger;
