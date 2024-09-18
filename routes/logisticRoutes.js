const express = require('express');
const router = express.Router();
const logisticController = require('../controllers/logisticController');

// Routes
router.post('/', logisticController.createDelivery);
router.get('/', logisticController.getAllDeliveries);
router.put('/:id', logisticController.updateDeliveryStatus);
router.get('/metrics', logisticController.getLogisticsMetrics);

module.exports = router;
