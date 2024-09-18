const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.createSale); // Create a new sale
router.get('/', salesController.getAllSales); // Get all sales entries
router.put('/:id', salesController.updateSales); // Update ticket sales
router.delete('/:id', salesController.deleteSale); // Delete sales entry

module.exports = router;
