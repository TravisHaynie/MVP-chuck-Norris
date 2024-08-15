const router = require('express').Router();
const { User } = require('../../models/comment');
const bcrypt = require('bcrypt');

// POST login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Incorrect username or password' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST signup
router.post('/signup', async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.logged_in = true;
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
