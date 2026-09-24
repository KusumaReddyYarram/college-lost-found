const express = require('express');
const router = express.Router();
const { submitClaim } = require('../controllers/claimController');

router.post('/submit', submitClaim);

module.exports = router;
