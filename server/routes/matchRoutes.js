const express = require('express');
const router = express.Router();
const {
  getMatches,
  getMyMatches,
  getMatchById,
  getMatchesByLostItem,
  getMatchesByFoundItem,
  evaluateMatch,
  updateMatchStatus
} = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');

// Public route for ad-hoc evaluation
router.post('/evaluate', evaluateMatch);

// Protected routes
router.get('/', protect, getMatches);
router.get('/my-matches', protect, getMyMatches);
router.get('/lost/:lostItemId', protect, getMatchesByLostItem);
router.get('/found/:foundItemId', protect, getMatchesByFoundItem);
router.get('/:id', protect, getMatchById);
router.put('/:id/status', protect, updateMatchStatus);

module.exports = router;
