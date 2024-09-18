// routes/dealRoutes.js
const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealController');

// POST: Add a new deal
router.post('/', dealController.addDeal);

// GET: Get all deals
router.get('/', dealController.getAllDeals);

router.put('/', dealController.updateDeliveryStatus); // Add this line


module.exports = router;
