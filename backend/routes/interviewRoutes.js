const express = require('express');
const router = express.Router();
const { getInterviews, updateInterview, createInterview } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

// Get all interviews
router.get('/', protect, getInterviews);

// Update interview decision
router.patch('/:id', protect, updateInterview);

// Create a new interview
router.post('/', protect, createInterview);

module.exports = router;
