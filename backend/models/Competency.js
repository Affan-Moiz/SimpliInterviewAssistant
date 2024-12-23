const mongoose = require('mongoose');

const competencySchema = new mongoose.Schema({
  title: { type: String, required: true }, // Name of the competency (e.g., "Marketing Research")
  type: { type: String, enum: ['technical', 'behavioral'], required: true }, // Type of competency
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position' }, // Associated position
}, { timestamps: true });

module.exports = mongoose.model('Competency', competencySchema);
