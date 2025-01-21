const express = require('express');
const router = express.Router();
const { getInterviews, updateInterview, createInterview, addResponses, getInterviewById } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

// Get all interviews
router.get('/', protect, getInterviews);

// Get an interview by ID
router.get('/:id', protect, getInterviewById);

// Update interview decision
router.patch('/:id', protect, updateInterview);

// Create a new interview
router.post('/', protect, createInterview);

// Add responses to an interview
router.post('/:id/responses', protect, addResponses);

module.exports = router;
