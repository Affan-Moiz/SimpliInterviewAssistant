const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
  interviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  competencies: [
    {
      competency: { type: mongoose.Schema.Types.ObjectId, ref: 'Competency' },
      completed: { type: Boolean, default: false }, // Whether all questions for this competency have been answered
      score: { type: Number, default: 0 }, // Score for this competency
    }
  ],
  responses: [
    {
      competency: { type: mongoose.Schema.Types.ObjectId, ref: 'Competency', required: true }, // Competency related to the response
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, // Question being answered
      topicsCovered: [{ type: String }], // Topics covered by the candidate
      score: { type: Number, default: 0 }, // Score for this specific response
    }
  ],
  totalScore: { type: Number, default: 0 }, // Overall score for the interview
  decision: { type: String, enum: ['Hold', 'Reject', 'Hire'], default: 'Hold' },
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
