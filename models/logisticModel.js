const mongoose = require('mongoose');

const logisticSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  status: { type: String, required: true }, // e.g., "On Route", "Delivered", "Delayed"
  expectedDeliveryTime: { type: String, required: true },
  shippingCost: { type: Number, required: true },
  route: { type: String, required: true },
  deliveryDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Logistic', logisticSchema);
