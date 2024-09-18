const mongoose = require('mongoose');

// Define the Procurement Schema
const procurementSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  vendorName: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaseStatus: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

// Export the Procurement model
const Procurement = mongoose.model('Procurement', procurementSchema);

module.exports = Procurement;
