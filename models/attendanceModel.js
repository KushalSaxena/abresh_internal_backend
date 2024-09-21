const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  timeIn: {
    type: String,
    default: null
  },
  timeOut: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'leave'],
    required : true
  },
  remarks: {
    type: String,
    default: ''
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
