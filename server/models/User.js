const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide email address'],
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
    },
    phone: {
      type: String,
      default: ''
    },
    studentId: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare user entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
