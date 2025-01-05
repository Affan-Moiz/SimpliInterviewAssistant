const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const { protect } = require('../middleware/authMiddleware');

// Get all interviews for a manager's organization
router.get('/organization/:organizationId', protect, async (req, res) => {
  try {
    const interviews = await Interview.find({ organization: req.params.organizationId });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update manager decision for an interview
router.patch('/:id/status', protect, async (req, res) => {
  const { managerDecision, managerComments } = req.body;

  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      res.status(404).json({ message: 'Interview not found' });
      return;
    }

    // Update decision and comments
    interview.managerDecision = managerDecision;
    interview.managerComments = managerComments;

    await interview.save();

    res.json({ message: 'Manager decision updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
