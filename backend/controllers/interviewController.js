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
      res.status(404).json({ message: 'Interview not found' });
      return;
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

const createInterview = async (req, res) => {
  const { candidateName, position, competencies } = req.body;

  try {
    // Check for missing required fields
    if (!candidateName || !position || !competencies || competencies.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new interview instance
    const interview = new Interview({
      candidateName,
      position,
      interviewer: req.user._id, // Set the interviewer from the logged-in user
      organization: req.user.organization, // Set the organization from the logged-in user's organization
      competencies: competencies.map((c) => ({
        competency: c.competency,
        completed: false,
        score: 0,
      })),
    });

    await interview.save();

    res.status(201).json({
      message: 'Interview created successfully',
      interview,
    });
  } catch (error) {
    console.error('Error creating interview:', error); // Log detailed error
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const addResponses = async (req, res) => {
  const { id } = req.params; // Interview ID
  const { responses } = req.body; // Array of responses from the frontend

  try {
    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Add the new responses to the interview
    responses.forEach((response) => {
      interview.responses.push({
        competency: response.competency,
        question: response.question,
        topicsCovered: [response.selectedTopic],
      });
    });

    // Mark the related competency as completed
    const competencyId = responses[0].competency;
    const competencyIndex = interview.competencies.findIndex(
      (c) => c.competency.toString() === competencyId
    );
    if (competencyIndex !== -1) {
      interview.competencies[competencyIndex].completed = true;
    }

    await interview.save();
    res.status(200).json({ message: 'Responses added successfully' });
  } catch (error) {
    console.error('Error adding responses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getInterviews, updateInterview, createInterview, addResponses };
