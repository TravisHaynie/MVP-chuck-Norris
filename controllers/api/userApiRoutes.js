const router = require('express').Router();
const { User } = require('../../models');  
const bcrypt = require('bcrypt');

// POST login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (user && bcrypt.compareSync(req.body.password, user.password)) { // Compare hashed passwords
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Incorrect username or password' });
    }
  } catch (err) {
    console.error('Login error:', err); // Improved error logging
    res.status(500).json({ message: 'Internal server error' });
  }
});


// POST signup
// POST signup
router.post('/signup', async (req, res) => {
  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      password: hashedPassword, // Save hashed password
    });

    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.logged_in = true;
    res.status(201).json(user);
  } catch (err) {
    console.error('Signup error:', err); // Improved error logging
    res.status(500).json({ message: 'Internal server error' });
  }
});


// POST logout
// POST logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});


module.exports = router;
