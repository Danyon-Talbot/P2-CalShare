const router = require('express').Router();

const userRoutes = require('./userRoutes');

const eventRoutes = require('./eventRoutes');

const availabilityRoutes = require('./availabilityRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/availability', availabilityRoutes);

module.exports = router;
