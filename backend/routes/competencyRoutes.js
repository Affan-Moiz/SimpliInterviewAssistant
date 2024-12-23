const express = require('express');
const router = express.Router();
const {
  getCompetencies,
  getCompetencyById,
  createCompetency,
  updateCompetency,
  deleteCompetency,
} = require('../controllers/competencyController');

// CRUD operations for competencies
router.get('/', getCompetencies);
router.get('/:id', getCompetencyById);
router.post('/', createCompetency);
router.put('/:id', updateCompetency);
router.delete('/:id', deleteCompetency);

module.exports = router;
