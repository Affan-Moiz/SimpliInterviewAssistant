const Competency = require('../models/Competency');

// Get all competencies filtered by position
const getCompetencies = async (req, res) => {
  const { position } = req.query; // Get position ID from query parameters

  try {
    if (!position) {
      return res.status(400).json({ message: 'Position ID is required' });
    }

    // Find competencies related to the given position
    const competencies = await Competency.find({ position });
    res.json(competencies);
  } catch (error) {
    console.error('Error fetching competencies:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a competency by ID
const getCompetencyById = async (req, res) => {
  try {
    const competency = await Competency.findById(req.params.id);
    if (!competency) {
      res.status(404).json({ message: 'Competency not found' });
      return;
    }
    res.json(competency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new competency
const createCompetency = async (req, res) => {
  try {
    const competency = await Competency.create(req.body);
    res.status(201).json(competency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a competency
const updateCompetency = async (req, res) => {
  try {
    const competency = await Competency.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!competency) {
      res.status(404).json({ message: 'Competency not found' });
      return;
    }
    res.json(competency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a competency
const deleteCompetency = async (req, res) => {
  try {
    const competency = await Competency.findByIdAndDelete(req.params.id);
    if (!competency) {
      res.status(404).json({ message: 'Competency not found' });
      return;
    }
    res.json({ message: 'Competency deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompetencies,
  getCompetencyById,
  createCompetency,
  updateCompetency,
  deleteCompetency,
};
