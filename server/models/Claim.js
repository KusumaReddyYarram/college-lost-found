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
    evidenceMatchScore: {
      type: Number,
      default: 0
    },
    identityVerified: {
      type: Boolean,
      default: true
    },
    claimConfidence: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    suspiciousFlag: {
      isSuspicious: {
        type: Boolean,
        default: false
      },
      riskLevel: {
        type: String,
        enum: ['None', 'Low', 'Medium', 'High'],
        default: 'None'
      },
      reasons: [String]
    },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'approved', 'rejected', 'cancelled'],
      default: 'pending'
    },
    reviewNotes: {
      type: String,
      default: ''
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Claim', claimSchema);
