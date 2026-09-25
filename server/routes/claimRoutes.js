const express = require('express');
const router = express.Router();
const { submitClaim, getClaims, reviewClaim } = require('../controllers/claimController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/submit', protect, submitClaim);
router.get('/', protect, getClaims);
router.put('/:id/review', protect, authorize('staff', 'admin'), reviewClaim);

module.exports = router;
