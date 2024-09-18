const Logistic = require('../models/logisticModel');

// Create new delivery entry
exports.createDelivery = async (req, res) => {
  try {
    const logistic = new Logistic(req.body);
    await logistic.save();
    res.status(201).json(logistic);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create delivery entry' });
  }
};

// Get all deliveries
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Logistic.find();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deliveries' });
  }
};

// Update delivery status
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const updatedDelivery = await Logistic.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, expectedDeliveryTime: req.body.expectedDeliveryTime },
      { new: true }
    );
    res.status(200).json(updatedDelivery);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update delivery' });
  }
};

// Get logistics performance metrics
exports.getLogisticsMetrics = async (req, res) => {
  try {
    const totalDeliveries = await Logistic.countDocuments();
    const onTimeDeliveries = await Logistic.countDocuments({ status: 'Delivered' });
    const pendingDeliveries = await Logistic.countDocuments({ status: 'On Route' });

    const metrics = {
      totalDeliveries,
      onTimeDeliveryRate: ((onTimeDeliveries / totalDeliveries) * 100).toFixed(2),
      pendingDeliveries
    };

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch performance metrics' });
  }
};
