const router = require('express').Router();
const { User } = require('../../models');

// GET all users
router.get('/users', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new user
router.post('/users', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE
router.delete('/users/:UserID', async (req, res) => {
  try {
    const userId = req.params.UserID;
    await User.destroy({ where: { id: userId } });
    res.status(200).json({ message: 'User deleted successfully' })
  } catch {
    res.status(400).json(err);
  }
});

// PUT
router.put('/users/:userID', async (req, res) => {
  try {
    const userId = req.params.userID;
    const updatedUserData = await User.update(req.body, { where: { id: userId } });
    res.status(200).json(updatedUserData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router