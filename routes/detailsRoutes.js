// routes/dealRoutes.js
const express = require('express');
const router = express.Router();
const detailsController = require('../controllers/detailsController');

// POST: Add a new deal
router.post('/', detailsController.createDetails);
// GET: Fetch user details by username
router.get('/:username', detailsController.getDetailsByUsername);

// PUT: Update user leave and working days
router.put('/:username', detailsController.updateDetails);

module.exports = router;
