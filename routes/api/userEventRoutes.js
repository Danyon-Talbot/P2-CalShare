const express = require('express');
const router = express.Router();
const { Event, UserEvent, User } = require('../../models');
const { isAuthenticated } = require('../../utils/helpers');

router.get('/', async (req, res) => {
    try {
        const users = await UserEvent.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching User Events:', error);
        res.status(500).json({ message: 'Error fetching User Events' });
    }
});


module.exports = router;
