const router = require('express').Router();

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('signup');
});

module.exports = router;
