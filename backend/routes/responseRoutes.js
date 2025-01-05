const express = require('express');
const router = express.Router();
const { addResponse } = require('../controllers/responseController');

// Add a response to an interview
router.post('/:interviewId', addResponse);

module.exports = router;
