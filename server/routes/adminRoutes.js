const express = require('express');
const router = express.Router();
const {
  getUsers,
  updateUserRole,
  deleteUser,
  getHotspotAnalytics,
  getRecoveryAnalytics,
  getActivityLogs
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Protect all admin routes
router.use(protect);

router.get('/users', authorize('admin'), getUsers);
router.put('/users/:id/role', authorize('admin'), updateUserRole);
router.delete('/users/:id', authorize('admin'), deleteUser);

router.get('/hotspots', authorize('staff', 'admin'), getHotspotAnalytics);
router.get('/analytics', authorize('admin'), getRecoveryAnalytics);
router.get('/activity', authorize('admin'), getActivityLogs);

module.exports = router;
