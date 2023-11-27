const router = require('express').Router();
const { Event } = require('../../models');


//POST
router.post('/event', async (req, res) => {
    try {
      const eventData = await Event.create(req.body);
      res.status(200).json(eventData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//GET
router.get('/event', async (req, res) => {
    try {
      const eventData = await Event.findAll();
      res.status(200).json(eventData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//PUT
router.put('/event/:id', async (req, res) => {
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
router.delete('/event/:id', async (req, res) => {
    try {
        const EventID = parseInt(req.params.id);

        const eventIndex = Event.findIndex(event => event.id === EventID);

        if (eventIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const deletedEvent = events.splice(eventIndex, 1)[0];

        res.json({ message: 'Event deleted successfully', event: deletedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
});


module.exports = router;