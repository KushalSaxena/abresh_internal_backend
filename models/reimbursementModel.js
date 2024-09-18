const mongoose = require('mongoose');

const reimbursementSchema = new mongoose.Schema({
  employeeName: { type: String, required: true }, // Employee's name
  details: { type: String, required: true }, // Description of where they spent
  amount: { type: Number, required: true }, // Amount spent
  progress: { type: String, default: 'Pending' }, // Progress status (Pending, Approved, Rejected)
  createdAt: { type: Date, default: Date.now }, // Date of submission
});

module.exports = mongoose.model('Reimbursement', reimbursementSchema);
