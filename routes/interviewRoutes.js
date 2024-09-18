// routes/interviewRoutes.js
const express = require('express');
const { createInterview, getInterviews } = require('../controllers/interviewController');
const { upload } = require('../config/cloudinary'); // Import the upload middleware
const router = express.Router();

// Route to create an interview
router.post('/', upload.single('file'), createInterview);

// Route to get all interviews
router.get('/', getInterviews);

module.exports = router;
