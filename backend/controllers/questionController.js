const Question = require('../models/Question');

// Get questions filtered by competency
const getQuestions = async (req, res) => {
  const { competency } = req.query; // Get competency ID from query parameters

  try {
    // If competency ID is provided, filter questions by competency
    const filter = competency ? { competency } : {};

    const questions = await Question.find(filter).populate('competency');
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('competency');
    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a question
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
