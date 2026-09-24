const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'campusfind_ai_super_secret_jwt_token_key_2026'
      );

      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      console.error('JWT Verification Failed:', error.message);
      return res.status(401).json({
        status: 'fail',
        message: 'Not authorized, token validation failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Not authorized, no bearer token provided'
    });
  }
};

module.exports = { protect };
