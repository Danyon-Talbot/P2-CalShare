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

// GET user by user_id
router.get('/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    try {
        const user = await User.findOne({ where: { user_id: userId }});

        if (user) {
        res.json(user);
        } else {
        res.status(404).json({ message: 'User not found' });
        } 
    } catch (error) {
        console.error('Error fetching user: ', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
});

router.get('/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    try {
      // Retrieve data for the user with userId
      const userData = await fetchDataForUser(userId);
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Error fetching user data' });
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

// Route for user logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    } else {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    }
  });
});

router.get('/api/getCurrentUserId', async (req, res) => {
    if (req.session && req.session.userId) {
        // Assuming req.session.userId stores the logged-in user's ID
        try {
            const user = await User.findByPk(req.session.userId);
            if (user) {
                res.json({ user_id: user.id });
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).send('Server error');
        }
    } else {
        res.status(401).send('User not authenticated');
    }
});



module.exports = router;