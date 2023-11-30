// utils/auth.js
const withAuth = (req, res, next) => {
    // Exclude the auth route from the auth check
    if (req.path === '/auth') {
      return next();
    }
  
    // If the user is not logged in, redirect them to the login page
    if (!req.session.logged_in) {
      res.redirect('/auth');
    } else {
      // If the user is logged in, proceed to the next middleware
      next();
    }
  };
  
  module.exports = withAuth;
  