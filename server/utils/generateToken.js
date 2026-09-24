const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'campusfind_ai_super_secret_jwt_token_key_2026', {
    expiresIn: '30d'
  });
};

module.exports = generateToken;
