const express = require('express');
const router = express.Router();
const { Event, UserEvent } = require('../../models');
const { isAuthenticated } = require('../../utils/helpers');



// GET all Events
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll({
            order: [[ 'id', 'ASC']]
        });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// GET event by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const event = await Event.findOne({ where: { id: id } });

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


router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { event_name, start_time, end_time, guests } = req.body;
        const creator_id = req.session.user.id;
        // Create a new event record
        const newEvent = await Event.create({
        event_name,
        creator_id,
        start_time,
        end_time,
        guests,
        });

        if (guests && guests.length > 0) {
            const guestRecords = guests.map((user_id) => {
                return { user_id, event_id: newEvent.id }
            });

            await UserEvent.bulkCreate(guestRecords);
        }

        return res.json(newEvent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the event.' });
    }
});




//PUT
router.put('/:id', async (req, res) => {
    try {
        const EventID = parseInt(req.params.id);
        const updatedData = req.body;

        const eventIndex = Event.findIndex(event => event.id === EventID);

        if (eventIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        events[eventIndex] = { ...events[eventIndex], updatedData };

        res.json({ message: 'Event updated successfully', event: events[eventIndex] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const EventID = parseInt(req.params.id);

        const eventIndex = Event.findIndex(event => event.id === EventID);

        if (eventIndex === -1) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const deletedEvent = Event.splice(eventIndex, 1)[0];

        res.json({ message: 'Event deleted successfully', event: deletedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
});




module.exports = router;
