const express = require('express');
const router = express.Router();
const {
  getCompetencies,
  getCompetencyById,
  createCompetency,
  updateCompetency,
  deleteCompetency,
} = require('../controllers/competencyController');
const { protect } = require('../middleware/authMiddleware');

// Get all competencies (filtered by position)
router.get('/', protect, getCompetencies);

// Get a competency by ID
router.get('/:id', protect, getCompetencyById);

// Create a new competency
router.post('/', protect, createCompetency);

// Update a competency
router.put('/:id', protect, updateCompetency);

// Delete a competency
router.delete('/:id', protect, deleteCompetency);

module.exports = router;
