const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({ where: { id: id } });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
});

  // Signup route
router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const newUser = await User.create({
            firstname: firstname,
            lastname: lastname,
            email,
            password
        });

        res.status(201).json({ message: 'User created successfully', newUser});
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});



module.exports = router;
