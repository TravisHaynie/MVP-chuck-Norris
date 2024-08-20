const router = require('express').Router();
const { Post, Comment, User } = require('../models'); 

router.get('/post/:id', async (req, res) => {
  try {
    console.log('Rendering post view');
    console.log('Post ID:', req.params.id);
    console.log('Session:', req.session);

    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [User] }
      ]
    });
    if (!post) {
      res.status(404).send('Post not found');
      return;
    }
    res.render('post/single', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.error('Error:', err);
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
