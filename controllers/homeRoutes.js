const router = require('express').Router();
const { User, Post } = require('../models');




router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    console.log(posts);
    res.render('index', { posts, logged_in: req.session.logged_in });
  } catch (err) {
     // Log error detail
     console.error("Error fetching posts:", err); 
    res.status(500).json(err);
  }
});

module.exports = router;
