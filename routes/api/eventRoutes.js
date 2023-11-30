const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
const { Event } = require('../../models');


// GET all users
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await Event.findByPk(eventId);

        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Error fetching event' });
    }
});

module.exports = router;