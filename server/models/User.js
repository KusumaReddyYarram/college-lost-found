const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide college email'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6
    },
    department: {
      type: String,
      default: ''
    },
    year: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      enum: ['student', 'staff', 'admin'],
      default: 'student'
    },
    reputationScore: {
      type: Number,
      default: 100
    },
    isVerifiedFinder: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
