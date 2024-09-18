// routes/workRoutes.js

const express = require('express');
const { getAllWork, postWork, updateWorkStatus, deleteWork, filterWorks } = require('../controllers/workController');
const authenticateToken = require('../middleware/auth');
const { upload } = require('../config/cloudinary'); // Import the upload middleware

const router = express.Router();

// GET all work items based on role
router.get('/', authenticateToken, getAllWork);

// POST a new work item with image upload
router.post('/', authenticateToken, upload.single('file'), postWork); // 'image' is the form field name

// PUT to update the status of a work item by ID
router.put('/:id', authenticateToken, updateWorkStatus);

// DELETE a work item by ID (Admin only)
router.delete('/:id', authenticateToken, deleteWork);

router.get('/filter', filterWorks);


module.exports = router;
