const Sales = require('../models/salesModel');
const mongoose = require('mongoose');

// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const { eventName, ticketPrice, location, date, ticketsSold, goal } = req.body;

    const sales = new Sales({
      eventName,
      ticketPrice,
      location,
      date,
      ticketsSold: ticketsSold || 0, // Default 0 tickets sold initially
      goal
    });

    await sales.save();
    res.status(201).json({ message: 'Sales entry created', sales });
  } catch (error) {
    res.status(500).json({ message: 'Error creating sales entry', error: error.message });
  }
};

// Get all sales entries
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sales.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales', error: error.message });
  }
};

// Update tickets sold and recalculate sales
exports.updateSales = async (req, res) => {
  try {
    const { id } = req.params;
    const { ticketsSold } = req.body;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid sales ID' });
    }

    const sales = await Sales.findById(id);
    if (!sales) return res.status(404).json({ message: 'Sales entry not found' });

    // Update tickets sold
    sales.ticketsSold += ticketsSold;
    sales.sales = sales.ticketsSold * sales.ticketPrice;

    // Decrease the sales goal dynamically
    sales.goal -= sales.sales;

    await sales.save();

    res.status(200).json({ message: 'Sales updated', sales });
  } catch (error) {
    res.status(500).json({ message: 'Error updating sales', error: error.message });
  }
};

// Delete a sales entry
exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid sales ID' });
    }

    const sales = await Sales.findByIdAndDelete(id);
    if (!sales) return res.status(404).json({ message: 'Sales entry not found' });

    res.status(200).json({ message: 'Sales entry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sales', error: error.message });
  }
};
