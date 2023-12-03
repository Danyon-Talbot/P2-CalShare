const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/helpers');

// route that requires authentication
router.get('/:user_id', isAuthenticated, (req, res) => {
    const user = req.session.user;
    res.render('home', { title: 'CalShare', user });
});

module.exports = router;

