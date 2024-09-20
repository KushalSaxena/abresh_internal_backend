const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary'); // Import the upload middleware
const userDetailController = require('../controllers/userDetailController');

// Route to create a new user detail
router.post('/', upload.single('file') , userDetailController.createUserDetails);

// Route to get user details by role
router.get('/', userDetailController.getUserDetailsByRole);

module.exports = router;
