// controllers/workController.js
const { cloudinary } = require('../config/cloudinary');
const Work = require('../models/workModel');
const path = require('path');

// POST /api/works
// controllers/workController.js

exports.postWork = async (req, res) => {
  try {
    const { name,email, contactNumber,  workDetail, description, priority, status, startDate, endDate, notes } = req.body;
    const userRole = req.user.role;

    let fileData = {};

    // Check if a file (image or PDF) was uploaded
    if (req.file) {
      // Multer-Cloudinary has already uploaded the file, so the data is available in req.file
      fileData = {
        public_id: req.file.filename, // Cloudinary's public ID
        url: req.file.path, // Cloudinary's secure URL
        format: req.file.mimetype // To store the file format (e.g., image/jpeg, application/pdf)
      };

      console.log('File Uploaded to Cloudinary');
    }

    // Create a new work entry with the file data
    const work = new Work({
      name,
      email,
      contactNumber,
      workDetail,
      description,
      priority,
      status,
      startDate,
      endDate: endDate || null,
      notes,
      role: userRole,
      file: fileData, // Store the file details
    });

    await work.save();
    res.status(201).json({ message: 'Work posted successfully', work });
  } catch (error) {
    console.error('Error creating work:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.filterWorks = async (req, res) => {
  try {
    const { role, username, deadline } = req.query;  // Fetch the filter parameters from the query

    let filterCriteria = {};

    // Apply role filter if provided
    if (role) {
      filterCriteria.role = role;
    }

    // Apply username filter if provided
    if (username) {
      filterCriteria.username = username;
    }

    // Apply deadline filter if provided
    if (deadline) {
      filterCriteria.deadline = { $lte: new Date(deadline) };  // Show tasks due by the given deadline
    }

    const works = await Work.find(filterCriteria);  // Fetch tasks based on filters

    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filtered tasks', error: error.message });
  }
};
// GET /api/works
exports.getAllWork = async (req, res) => {
  try {
    const userRole = req.user.role; // Assumes req.user is set by authentication middleware
    let works;

    // If the user is Admin or HR, allow access to all tasks
    if (userRole === 'Admin' || userRole === 'HR') {
      works = await Work.find();
    } else {
      // For regular users, filter tasks based on their role
      works = await Work.find({ role: userRole });
    }

    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching work items', error: error.message });
  }
};

// PUT /api/works/:id
exports.updateWorkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status input
    const validStatuses = ['not started', 'in progress', 'completed', 'blocked'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find the work item by ID and update the status
    const updatedWork = await Work.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedWork) {
      return res.status(404).json({ message: 'Work item not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', work: updatedWork });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};

// DELETE /api/works/:id
exports.deleteWork = async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow deletion if the user is an admin
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this work item' });
    }

    // Find and delete the work item by ID
    const deletedWork = await Work.findByIdAndDelete(id);

    if (!deletedWork) {
      return res.status(404).json({ message: 'Work item not found' });
    }

    res.status(200).json({ message: 'Work item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting work item', error: error.message });
  }
};
