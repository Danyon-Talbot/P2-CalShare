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

module.exports = router;
