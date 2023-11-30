const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/helpers');

// route that requires authentication
router.get('/', isAuthenticated, (req, res) => {
    const user = req.session.user;
    res.render('home', { title: 'CalShare' });
    res.status(200).json({ user });
});


  router.get('/:user_id', async (req, res) => {
try {
    // Extract the user_id from the URL parameter
    const user_id = req.params.user_id;

    // Fetch relevant data if needed

    // Render an HTML page using a template engine like Handlebars
    res.render('home');
} catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
}
});
  
module.exports = router;