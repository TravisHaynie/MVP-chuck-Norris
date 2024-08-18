const router = require('express').Router();
const { User, Post, Comment } = require('../../models');



// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [User] }
      ]
    });
    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT update a post by id
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: req.params.id } }
    );
    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a post by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.destroy({ where: { id: req.params.id } });
    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
