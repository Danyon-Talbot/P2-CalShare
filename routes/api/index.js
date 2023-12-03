const router = require('express').Router();

const userRoutes = require('./userRoutes');

const eventRoutes = require('./eventRoutes');

const userEventRoutes = require('./userEventRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/userEvents', userEventRoutes);

module.exports = router;
