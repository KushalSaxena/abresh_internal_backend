const Details = require('../models/detailsModel');
const bcrypt = require('bcrypt');

// API to create a new user
exports.createDetails = async (req, res) => {
  try {
    const { username, joiningDate, totalSalary, leave } = req.body;

    // Create a new user
    const details = new Details({
      username,
      joiningDate,
      totalSalary,
      leave: leave || 0, // Default leave is 0
      workingDays: 30 - (leave || 0), // Calculate working days
    });

    await details.save();

    res.status(201).json({ message: 'Details created successfully', details });
  } catch (error) {
    res.status(500).json({ message: 'Error creating details', error: error.message });
  }
};

// Fetch user details by username
exports.getDetailsByUsername = async (req, res) => {
  try {
    const { username } = req.params; // Fetch username from the URL parameters

    // Find the user details by username
    const details = await Details.findOne({ username });

    if (!details) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching details', error: error.message });
  }
};

// Update leave and working days for a user
exports.updateDetails = async (req, res) => {
  try {
    const { username } = req.params; // Fetch username from the URL parameters
    const { leave } = req.body; // The new leave value from the request body

    // Find the user by username
    const details = await Details.findOne({ username });

    if (!details) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update leave and dynamically adjust working days
    details.leave = leave;
    details.workingDays = 30 - leave;

    // Save the updated details
    await details.save();

    res.status(200).json({ message: 'Details updated successfully', details });
  } catch (error) {
    res.status(500).json({ message: 'Error updating details', error: error.message });
  }
};
