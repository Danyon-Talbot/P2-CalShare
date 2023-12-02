const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// Consider Grouping loginRoutes and signupRoutes Auth
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');
const logoutRoutes = require('./logoutRoutes');

router.use('/api', apiRoutes);

router.use('/home', homeRoutes);

router.use('/login', loginRoutes);

router.use('/signup', signupRoutes);

router.use('/logout', logoutRoutes);

module.exports = router;
