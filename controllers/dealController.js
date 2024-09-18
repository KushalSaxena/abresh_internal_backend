// controllers/dealController.js
const Deal = require('../models/dealModel');

// Add a new deal
exports.addDeal = async (req, res) => {
  const {
    description,
    initialAmount,
    negotiatedAmount,
    dealOwnerName,
    dealOwnerEmail,
    dealOwnerContact,
    location,
    address,
    status,
  } = req.body;

  try {
    const newDeal = new Deal({
      description,
      initialAmount,
      negotiatedAmount,
      dealOwnerName,
      dealOwnerEmail,
      dealOwnerContact,
      location,
      address,
      status,
    });

    const savedDeal = await newDeal.save();
    res.status(201).json(savedDeal);
  } catch (error) {
    res.status(500).json({ message: 'Error adding deal', error });
  }
};

// Get all deals
exports.getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find();
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deals', error });
  }
};

// controllers/dealController.js
// Assuming description is used as a unique identifier for the deal.
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { description, status } = req.body; // Fetch the description and status from the request body.

    if (!description || !status) {
      return res.status(400).json({ error: 'Description and status are required' });
    }

    // Find deal by description (or another unique field) and update its status
    const updatedDeal = await Deal.findOneAndUpdate(
      { description: description }, // Find by description or other unique identifier
      { status: status },    
      { negotiatedAmount : negotiatedAmount},        // Update status
      { new: true }                  // Return the updated document
    );

    if (!updatedDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    res.status(200).json(updatedDeal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};


