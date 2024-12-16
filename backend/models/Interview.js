const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
  interviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  competencies: [
    { competency: { type: mongoose.Schema.Types.ObjectId, ref: 'Competency' }, score: { type: Number, default: 0 } }
  ],
  totalScore: { type: Number, default: 0 },
  decision: { type: String, enum: ['Hold', 'Reject', 'Hire'], default: 'Hold' },
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
