const Interview = require('../models/Interview');
const calculateScores = require('../utils/calculateScores');

const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ organization: req.user.organization });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInterview = async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  try {
    const interview = await Interview.findById(id);

    if (!interview) {
      res.status(404);
      throw new Error('Interview not found');
    }

    interview.decision = decision;
    const scores = calculateScores(interview);
    interview.totalScore = scores.totalScore;
    await interview.save();

    res.json({ message: 'Interview updated', scores });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getInterviews, updateInterview };
