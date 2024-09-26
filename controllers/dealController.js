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
    const { description, status, negotiatedAmount } = req.body; // Fetch description, status, and negotiatedAmount from the request body.

    if (!description || !status) {
      return res.status(400).json({ error: 'Description and status are required' });
    }

    // Find the deal by description and update its status and optionally negotiatedAmount
    const updateData = { status: status };
if (negotiatedAmount) {
  updateData.negotiatedAmount = negotiatedAmount;
}

const updatedDeal = await Deal.findOneAndUpdate(
  { description: description }, 
  updateData, 
  { new: true }
);


    if (!updatedDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    res.status(200).json(updatedDeal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

// Delete a deal by description
exports.deleteDeal = async (req, res) => {
  try {
    const { description } = req.params;  // Assuming description is passed as a URL parameter

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const deletedDeal = await Deal.findOneAndDelete({ description: description });

    if (!deletedDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    res.status(200).json({ message: 'Deal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete deal' });
  }
};



