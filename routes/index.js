const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes not finished, seemingly was causing issues with starting Server.
router.use('/api', apiRoutes);

router.get('/login', (req, res) => {
  res.render('login', { title: 'CalShare' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up to CalShare' });
});

router.get('/home', (req, res) => {
  res.render('home', { title: 'CalShare' });
});
// This was blocking error messages from generating in the console.
// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;
