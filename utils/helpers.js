// check if the user is authenticated
function isAuthenticated(req, res, next) {
  console.log("req.session.user:", req.session.user);
  if (req.session.user) {
    next();
  } else {
    console.log("Unauthorized: No user session");
    res.status(401).json({ message: 'Unauthorized' });
  }
}




module.exports = { isAuthenticated };
