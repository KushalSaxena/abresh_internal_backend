const Procurement = require('../models/procurementModel');
const mongoose = require('mongoose');


// Create a new procurement entry
exports.createProcurement = async (req, res) => {
  try {
    const { productName, vendorName, contact, location, amount, purchaseStatus } = req.body;

    const procurement = new Procurement({
      productName,
      vendorName,
      contact,
      location,
      amount,
      purchaseStatus,
    });

    await procurement.save();
    res.status(201).json({ message: 'Procurement entry created', procurement });
  } catch (error) {
    res.status(500).json({ message: 'Error creating procurement entry', error: error.message });
  }
};

// Get all procurement entries
exports.getAllProcurements = async (req, res) => {
  try {
    const procurements = await Procurement.find();
    res.status(200).json(procurements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching procurements', error: error.message });
  }
};

// Get a procurement entry by ID
exports.getProcurementById = async (req, res) => {
  try {
    const procurement = await Procurement.findById(req.params.id);
    if (!procurement) return res.status(404).json({ message: 'Procurement entry not found' });
    res.status(200).json(procurement);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching procurement', error: error.message });
  }
};


// Update procurement status
exports.updateProcurementStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { purchaseStatus } = req.body;

    // Update the procurement
    const procurement = await Procurement.findByIdAndUpdate(
      id,
      { purchaseStatus },
      { new: true }
    );

    if (!procurement) return res.status(404).json({ message: 'Procurement entry not found' });

    res.status(200).json({ message: 'Procurement status updated', procurement });
  } catch (error) {
    res.status(500).json({ message: 'Error updating procurement status', error: error.message });
  }
};


// Delete a procurement entry
exports.deleteProcurement = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate if the ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid procurement ID' });
      }
  
      const procurement = await Procurement.findByIdAndDelete(id);
  
      if (!procurement) return res.status(404).json({ message: 'Procurement entry not found' });
  
      res.status(200).json({ message: 'Procurement entry deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting procurement', error: error.message });
    }
  };
  