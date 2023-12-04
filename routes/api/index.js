const router = require('express').Router();

const userRoutes = require('./userRoutes');

const eventRoutes = require('./eventRoutes');

const availabilityRoutes = require('./availabilityRoutes');

const userEventRoutes = require('./userEventRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/availability', availabilityRoutes);
router.use('/userEvents', userEventRoutes);

module.exports = router;
