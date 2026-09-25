const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    lostItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
      index: true
    },
    foundItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
      index: true
    },
    semanticScore: {
      type: Number,
      default: 0
    },
    categoryScore: {
      type: Number,
      default: 0
    },
    nameScore: {
      type: Number,
      default: 0
    },
    colorScore: {
      type: Number,
      default: 0
    },
    brandScore: {
      type: Number,
      default: 0
    },
    featureScore: {
      type: Number,
      default: 0
    },
    locationScore: {
      type: Number,
      default: 0
    },
    dateScore: {
      type: Number,
      default: 0
    },
    finalScore: {
      type: Number,
      required: true,
      index: true
    },
    matchLevel: {
      type: String,
      enum: ['Strong Match', 'Possible Match', 'Weak Match', 'Unlikely Match'],
      required: true
    },
    reasons: [
      {
        type: String
      }
    ],
    differences: [
      {
        type: String
      }
    ],
    status: {
      type: String,
      enum: ['Suggested', 'Viewed', 'ClaimStarted', 'Verified', 'Rejected', 'Resolved'],
      default: 'Suggested',
      index: true
    }
  },
  { timestamps: true }
);

// Compound unique index to prevent duplicate lost/found match records
matchSchema.index({ lostItem: 1, foundItem: 1 }, { unique: true });

module.exports = mongoose.model('Match', matchSchema);
