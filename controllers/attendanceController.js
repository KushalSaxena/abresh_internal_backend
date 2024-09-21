const Attendance = require('../models/attendanceModel');

// POST - Create a new attendance record
exports.createAttendance = async (req, res) => {
    try {
      const { name,department,designation, status, remarks, timeIn, timeOut} = req.body; // Accept timeIn and timeOut from request body
  
      // Create a new attendance record with manually entered timeIn and timeOut
      const attendance = new Attendance({
        name,
        department,
        designation,
        status,
        remarks,
        timeIn, // Manually entered timeIn
        timeOut // Manually entered timeOut
      });
  
      await attendance.save();
      res.status(201).json({ message: 'Attendance record created successfully', attendance });
    } catch (error) {
      res.status(500).json({ message: 'Error creating attendance', error: error.message });
    }
  };
  
// GET - Get all attendance records
exports.getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendances', error: error.message });
  }
};

// GET - Get a specific attendance by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
};

// PUT - Update timeOut, status, and remarks of a specific attendance record by ID
exports.updateAttendance = async (req, res) => {
  try {
    const { timeIn, timeOut, status, remarks } = req.body;
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    if (timeIn) attendance.timeIn = timeIn;
    if (timeOut) attendance.timeOut = timeOut;
    if (status) attendance.status = status;
    if (remarks) attendance.remarks = remarks;

    await attendance.save();
    res.status(200).json({ message: 'Attendance record updated successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance', error: error.message });
  }
};

// DELETE - Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attendance', error: error.message });
  }
};
