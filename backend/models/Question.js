const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  competency: { type: mongoose.Schema.Types.ObjectId, ref: 'Competency', required: true }, // Associated competency
  text: { type: String, required: true }, // Question text (e.g., "How do you conduct market research?")
  topics: [{ type: String }], // Topics the candidate should cover (e.g., ["Customer surveys", "Data analysis"])
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Difficult'], required: true }, // Difficulty level
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
