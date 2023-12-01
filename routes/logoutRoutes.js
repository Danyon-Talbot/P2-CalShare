const router = require('express').Router();

// Route for user logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out successfully' });
        // Take to login page
        res.redirect('/');
      }
    });
  });

  // Test route
router.get('/test', (req, res) => {
  res.send('Test route works!');
});

module.exports = router;