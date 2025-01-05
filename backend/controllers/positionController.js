const Position = require('../models/Position');

// Get all positions
const getPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a position by ID
const getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) {
      res.status(404).json({ message: 'Position not found' });
      return;
    }
    res.json(position);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new position
const createPosition = async (req, res) => {
  try {
    const position = await Position.create(req.body);
    res.status(201).json(position);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a position
const updatePosition = async (req, res) => {
  try {
    const position = await Position.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!position) {
      res.status(404).json({ message: 'Position not found' });
      return;
    }
    res.json(position);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a position
const deletePosition = async (req, res) => {
  try {
    const position = await Position.findByIdAndDelete(req.params.id);
    if (!position) {
      res.status(404).json({ message: 'Position not found' });
      return;
    }
    res.json({ message: 'Position deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition,
};
