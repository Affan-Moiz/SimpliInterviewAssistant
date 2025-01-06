const express = require('express');
const router = express.Router();
const { getInterviews, updateInterview, createInterview, addResponses } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

// Get all interviews
router.get('/', protect, getInterviews);

// Update interview decision
router.patch('/:id', protect, updateInterview);

// Create a new interview
router.post('/', protect, createInterview);

// Add responses to an interview
router.post('/:id/responses', protect, addResponses);

module.exports = router;
