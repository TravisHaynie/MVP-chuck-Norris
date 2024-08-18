const router = require('express').Router();
const { Post, Comment, User } = require('../models'); 

router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [User] }
      ]
    });
    res.render('post/single', { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    const posts = await Post.findAll({
      where: { user_id: req.session.user_id },
    });
    res.render('post/dashboard', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
