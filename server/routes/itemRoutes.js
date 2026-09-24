const express = require('express');
const router = express.Router();
const { createItem, getItems, getItemById } = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createItem)
  .get(getItems);

router.route('/:id')
  .get(getItemById);

module.exports = router;
