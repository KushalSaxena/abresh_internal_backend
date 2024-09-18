const express = require('express');
const router = express.Router();
const {createEvent, getEvents} = require('../controllers/eventController');

// POST: Create a new event
router.post('/', createEvent);

// GET: Get all events
router.get('/', getEvents);

module.exports = router;
