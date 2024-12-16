const express = require('express');
const router = express.Router();
const { getInterviews, updateInterview } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getInterviews);
router.patch('/:id', protect, updateInterview);

module.exports = router;
