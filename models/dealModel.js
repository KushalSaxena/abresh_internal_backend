// models/dealModel.js
const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  initialAmount: {
    type: String,
    required: true,
  },
  negotiatedAmount: {
    type: String,
  },
  dealOwnerName: {
    type: String,
    required: true,
  },
  dealOwnerEmail: {
    type: String,
    required: true,
  },
  dealOwnerContact: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: { type: String, required: true }, // e.g., "On Route", "Delivered", "Delayed"

});

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
