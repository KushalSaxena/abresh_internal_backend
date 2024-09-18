const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workDetail: { type: String, required: true },
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ['P0', 'P1', 'P2', 'P3', 'P4'],
    required: true,
  },
  status: {
    type: String,
    enum: ['not started', 'in progress', 'completed', 'blocked'],
    default: 'not started',
  },
  startDate: { type: Date },
  endDate: { type: Date },
  file: { // Renamed 'image' to 'file' to handle both images and PDFs
    public_id: { type: String, required: true },
    url: { type: String },
    format: { type: String }, // Added format to store file format (e.g., 'image/jpeg', 'application/pdf')
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, required: true },
});

const Work = mongoose.model('Work', workSchema);
module.exports = Work;
