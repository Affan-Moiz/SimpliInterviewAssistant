const express = require('express');
const router = express.Router();
const {
  getPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition,
} = require('../controllers/positionController');

// CRUD operations for positions
router.get('/', getPositions);
router.get('/:id', getPositionById);
router.post('/', createPosition);
router.put('/:id', updatePosition);
router.delete('/:id', deletePosition);

module.exports = router;
