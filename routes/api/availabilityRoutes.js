const express = require('express');
const router = express.Router();
const { User, Availability } = require('../../models');
const { isAuthenticated } = require('../../utils/helpers');

router.post('/', isAuthenticated, async (req, res) => {
  try {
      const availabilities = req.body;
      // Assuming availabilities is an array of availability objects
      await Availability.bulkCreate(availabilities);
      res.status(200).json({ message: 'Availability saved successfully' });
  } catch (error) {
      console.error('Error saving availability:', error);
      res.status(500).json({ error: 'Error saving availability' });
  }
});

router.get('/:userId', isAuthenticated, async (req, res) => {
  const userId = req.params.userId;
  try {
      const userAvailability = await Availability.findAll({
          where: { user_id: userId }
      });
      res.json(userAvailability);
  } catch (error) {
      console.error('Error fetching availability:', error);
      res.status(500).json({ error: 'Error fetching availability' });
  }
});

// New DELETE route for removing specific availability entries
router.delete('/delete', isAuthenticated, async (req, res) => {
  console.log(req.body)
  try {
      const idsToDelete = req.body.map(event => event.id); // Extract IDs from the eventsToDelete array
      for (const id of idsToDelete) {
          await Availability.destroy({
              where: { id: id } // Delete based on ID
          });
      }
      res.status(200).json({ message: 'Availability deleted successfully' });
  } catch (error) {
      console.error('Error deleting availability:', error);
      res.status(500).json({ error: 'Error deleting availability' });
  }
});

module.exports = router;
