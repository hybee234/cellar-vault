const withAuth = (req, res, next) => {
  // Redirects to /auth if not logged in
  if (!req.session.logged_in) {
      res.redirect('/auth');
  } else {
      next();
  }
};

module.exports = withAuth;
