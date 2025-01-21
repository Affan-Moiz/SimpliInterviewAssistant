const Interview = require('../models/Interview');
const calculateScores = require('../utils/calculateScores');

const getInterviews = async (req, res) => {
  try {
    const organizationId = req.user.organization;

    if (!organizationId) {
      return res.status(400).json({ message: 'User organization not found' });
    }

    // Fetch all non-rejected interviews for the organization
    const interviews = await Interview.find({
      organization: organizationId,
      decision: { $ne: 'Reject' },
    })
      .populate('position', 'title') // Populate position title
      .sort({ 'position.title': 1 });

    if (!interviews || interviews.length === 0) {
      return res.status(404).json({ message: 'No interviews found' });
    }

    // Group interviews by position title, handle null positions gracefully
    const groupedInterviews = interviews.reduce((acc, interview) => {
      const positionTitle = interview.position?.title || 'Unknown Position'; // Fallback to 'Unknown Position'
      if (!acc[positionTitle]) {
        acc[positionTitle] = [];
      }
      acc[positionTitle].push(interview);
      return acc;
    }, {});

    res.status(200).json(groupedInterviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateInterview = async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  try {
    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Update the final decision
    interview.decision = decision;

    if (decision === 'Hire') {
      // Reject all other interviews for the same position in the same organization
      await Interview.updateMany(
        { position: interview.position, organization: interview.organization, _id: { $ne: id } },
        { decision: 'Reject' }
      );
    }

    await interview.save();

    res.status(200).json({ message: 'Final decision updated successfully', interview });
  } catch (error) {
    console.error('Error updating interview:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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

    // Mark the related competency as completed and calculate its score
    const competencyId = responses[0].competency;
    const competencyIndex = interview.competencies.findIndex(
      (c) => c.competency.toString() === competencyId
    );
    if (competencyIndex !== -1) {
      interview.competencies[competencyIndex].completed = true;

      // Calculate score for the competency (example logic)
      const competencyResponses = responses.filter(
        (response) => response.competency === competencyId
      );
      const score = competencyResponses.length * 10; // Example scoring logic
      interview.competencies[competencyIndex].score = score;
    }

    // Recalculate the total score for the interview
    interview.totalScore = interview.competencies.reduce((acc, comp) => acc + comp.score, 0);

    await interview.save();
    res.status(200).json({ message: 'Responses added successfully' });
  } catch (error) {
    console.error('Error adding responses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getInterviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const interview = await Interview.findById(id)
      .populate('position', 'title')
      .populate('competencies.competency', 'title');

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.status(200).json(interview);
  } catch (error) {
    console.error('Error fetching interview:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = { getInterviews, updateInterview, createInterview, addResponses, getInterviewById };
