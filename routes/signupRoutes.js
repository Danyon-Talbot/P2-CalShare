const express = require('express');
const router = express.Router();


router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up to CalShare' });
});

module.exports = router;