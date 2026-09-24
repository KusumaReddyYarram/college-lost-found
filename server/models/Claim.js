const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    lostItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    foundItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    claimer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    answerProvided: {
      type: String,
      required: [true, 'Verification answer required']
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    reviewNotes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Claim', claimSchema);
