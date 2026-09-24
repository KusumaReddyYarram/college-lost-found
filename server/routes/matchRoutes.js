const express = require('express');
const router = express.Router();
const { evaluateMatch, getMyMatches } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

router.post('/evaluate', evaluateMatch);
router.get('/my-matches', protect, getMyMatches);

module.exports = router;
