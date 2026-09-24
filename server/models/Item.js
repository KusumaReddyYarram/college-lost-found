const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['lost', 'found'],
      required: true
    },
    title: {
      type: String,
      required: [true, 'Please provide item title'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please select item category'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide item description'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Please specify campus location'],
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    color: {
      type: String,
      default: ''
    },
    brand: {
      type: String,
      default: ''
    },
    identifyingMarks: {
      type: String,
      default: ''
    },
    images: [
      {
        type: String
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    privateVerificationQuestion: {
      type: String,
      default: 'Describe one secret unmentioned detail about this item.'
    },
    privateVerificationAnswer: {
      type: String,
      required: [true, 'Private verification answer required to prevent false claims'],
      select: false // Do not include in public queries by default!
    },
    status: {
      type: String,
      enum: ['reported', 'potential_match', 'claim_pending', 'recovered', 'closed'],
      default: 'reported'
    },
    potentialMatches: [
      {
        matchedItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item'
        },
        confidenceScore: Number,
        reasons: [String],
        evaluatedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
