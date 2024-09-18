const mongoose = require('mongoose');

// Define the Sales Schema
const salesSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  ticketsSold: { type: Number, required: true, default: 0 },
  sales: { type: Number, required: true, default: 0 },
  goal: { type: Number, required: true }, // Sales goal for the day
  createdAt: { type: Date, default: Date.now }
});

// Calculate sales dynamically based on the number of tickets sold
salesSchema.pre('save', function (next) {
  this.sales = this.ticketPrice * this.ticketsSold;
  next();
});

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;
