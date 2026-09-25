const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['match', 'claim', 'verification', 'status_change', 'system'],
      default: 'system'
    },
    relatedItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    relatedClaim: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Claim'
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
