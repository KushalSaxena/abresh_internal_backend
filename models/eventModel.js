const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventNo: {
    type: Number,
    required: true,
    unique: true
  },
  eventName: {
    type: String,
    required: true,
  },
  eventDetails: {
    type: String,
    required: true,
  },
  eventLocation:{
    type : String,
    required : true
  },
  eventDate: {
    type: Date,  // Date type for event date
    required: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);
