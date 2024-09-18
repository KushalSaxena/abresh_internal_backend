// models/interviewModel.js
const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    selectedDate: {
        type: Date,
        required: true
    },
    selectedSlot: {
        type: String,
        required: true
    },
    googleMeetLink: {
        type: String,
        required: true
    },
    file: { // Renamed 'image' to 'file' to handle both images and PDFs
        public_id: { type: String, required: true },
        url: { type: String },
        format: { type: String }, // Added format to store file format (e.g., 'image/jpeg', 'application/pdf')
      },
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
