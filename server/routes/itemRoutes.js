const express = require('express');
const router = express.Router();
const {
  checkDuplicateItem,
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');

router.post('/check-duplicate', checkDuplicateItem);
router.route('/')
  .get(getItems)
  .post(protect, createItem);

router.route('/:id')
  .get(getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;
