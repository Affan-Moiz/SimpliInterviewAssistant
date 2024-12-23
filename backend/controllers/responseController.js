const Interview = require('../models/Interview');

// Add a response to an interview
const addResponse = async (req, res) => {
  try {
    const { competency, question, topicsCovered, score } = req.body;
    const interview = await Interview.findById(req.params.interviewId);

    if (!interview) {
      res.status(404).json({ message: 'Interview not found' });
      return;
    }

    interview.responses.push({ competency, question, topicsCovered, score });
    await interview.save();

    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addResponse };
