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
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

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

// POST route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find the user by email
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check the password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // If login is successful, store user data in the session
      req.session.user_id = user.user_id;
      // Send the user_id in the response
      return res.status(200).json({ user_id: user.user_id, message: 'Logged in successfully' });

  } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Server error' });
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



module.exports = router;