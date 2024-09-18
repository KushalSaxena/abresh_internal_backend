const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Username to whom the task is assigned
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: String, required: true },
  progress: { type: String, default: 'Pending' },
  role: { type: String, required: true }, // Role the task is assigned to
  createdAt: { type: Date, default: Date.now }, // Task creation timestamp
});

module.exports = mongoose.model('Task', taskSchema);
