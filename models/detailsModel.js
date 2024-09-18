const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  joiningDate: {
    type: String,
    required: true,
  },
  totalSalary: {
    type: Number,
    required: true,
  },
  leave: {
    type: Number,
    required: true,
    default: 0, // Leave starts at 0 by default
  },
  workingDays: {
    type: Number,
    required: true,
    default: 30, // Default to 30 working days, decreases with leave
  },
});

detailsSchema.pre('save', function (next) {
  // Adjust working days based on leave
  this.workingDays = 30 - this.leave;
  next();
});

module.exports = mongoose.model('Details', detailsSchema);
