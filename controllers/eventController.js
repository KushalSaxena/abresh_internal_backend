const Event = require('../models/eventModel');

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { eventNo, eventName, eventDetails, eventLocation,eventDate } = req.body;

    const event = new Event({
      eventNo,
      eventName,
      eventDetails,
      eventLocation,
      eventDate: new Date(eventDate),  // Ensure the eventDate is a valid date
    });
    
    await event.save();

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
