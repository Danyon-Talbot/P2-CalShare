const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// Consider Grouping loginRoutes and signupRoutes Auth
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');


router.use('/api', apiRoutes);

router.use('/home', homeRoutes);

router.use('/login', loginRoutes);

router.use('/signup', signupRoutes);


// This was blocking error messages from generating in the console.
// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;
