// controllers/leaveController.js
const Leave = require('../models/leaveModel');

// Create a leave request
exports.createLeave = async (req, res) => {
  try {
    const { name, reason, date, numberOfDays } = req.body;
    const newLeave = new Leave({ name, reason, date, numberOfDays });
    await newLeave.save();
    res.status(201).json({ message: 'Leave request created', leave: newLeave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all leave requests
exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update leave status (Admin/HR only)
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    res.json({ message: 'Leave status updated', leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLeave = await Leave.findByIdAndDelete(id);

    if (!deletedLeave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.status(200).json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting leave request', error: error.message });
  }
};
