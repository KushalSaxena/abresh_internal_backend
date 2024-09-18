const express = require('express');
const router = express.Router();
const procurementController = require('../controllers/procurementController');

// Create a new procurement entry
router.post('/', procurementController.createProcurement);

// Get all procurement entries
router.get('/', procurementController.getAllProcurements);

// Get a single procurement entry by ID
router.get('/:id', procurementController.getProcurementById);

// Update procurement status
router.put('/:id', procurementController.updateProcurementStatus);

// Delete a procurement entry
router.delete('/:id', procurementController.deleteProcurement);

module.exports = router;
