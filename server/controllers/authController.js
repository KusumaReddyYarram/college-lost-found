const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new college user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password, department, year, academicYear } = req.body;

    if (!fullName || !email || !password) {
      res.status(400);
      throw new Error('Please provide full name, college email, and password');
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check existing user in MongoDB Atlas
    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      res.status(409);
      throw new Error('An account with this email already exists.');
    }

    // Create user in MongoDB Atlas
    const user = await User.create({
      fullName: fullName.trim(),
      email: cleanEmail,
      password,
      department: department ? department.trim() : '',
      year: year || academicYear || '1st Year'
    });

    if (user) {
      res.status(201).json({
        status: 'success',
        message: 'Account created successfully. Please log in.',
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          department: user.department,
          year: user.year,
          role: user.role,
          reputationScore: user.reputationScore,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(400);
      throw new Error('Invalid user registration data provided');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    const cleanEmail = email.trim().toLowerCase();

    // Query MongoDB Atlas for user
    const user = await User.findOne({ email: cleanEmail });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          department: user.department,
          year: user.year,
          role: user.role,
          reputationScore: user.reputationScore,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      res.status(404);
      throw new Error('User profile not found');
    }
    res.status(200).json({
      status: 'success',
      user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
