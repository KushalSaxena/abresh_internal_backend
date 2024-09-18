// routes/leaveRoutes.js
const express = require('express');
const { createLeave, getLeaves, updateLeaveStatus, deleteLeave } = require('../controllers/leaveController');
const authenticateToken = require('../middleware/auth');


const router = express.Router();

// Route to create a leave request
router.post('/leave', createLeave);

// Route to get all leave requests
router.get('/leaves', getLeaves);

// Route to update leave status (only Admin or HR can access)
router.put('/leave/:leaveId/status',updateLeaveStatus);

router.delete('/leaves/:id',deleteLeave)
module.exports = router;
