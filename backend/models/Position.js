const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Position title (e.g., "Marketing Manager")
  department: { type: String, required: true }, // Department associated with the position
  grade: { type: String, required: true }, // Grade level for the position
  reportingTo: { type: String }, // Reporting manager or higher-level position
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, // Associated organization
}, { timestamps: true });

module.exports = mongoose.model('Position', positionSchema);
