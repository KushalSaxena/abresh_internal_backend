const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// POST - Create a new attendance record
router.post('/attendance', attendanceController.createAttendance);

// GET - Get all attendance records
router.get('/attendance', attendanceController.getAllAttendances);

// GET - Get a specific attendance record by ID
router.get('/attendance/:id', attendanceController.getAttendanceById);

// PUT - Update a specific attendance record by ID
router.put('/attendance/:id', attendanceController.updateAttendance);

// DELETE - Delete a specific attendance record by ID
router.delete('/attendance/:id', attendanceController.deleteAttendance);

module.exports = router;
