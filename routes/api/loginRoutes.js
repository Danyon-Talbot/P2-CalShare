const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// POST route for user login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' }); // Use 401 for unauthorized
        }

        // Check the password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' }); // Use 401 for unauthorized
        }

        // If login is successful, store user data in the session
        req.session.user = user; //Stores User Session

        // Send a success response with user data if needed
        return res.status(200).json({ user_id: user.user_id, message: 'Logged in successfully' });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
