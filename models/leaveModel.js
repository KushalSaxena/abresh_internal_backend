// models/Leave.js
const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
