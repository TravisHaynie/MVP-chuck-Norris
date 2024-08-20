const express = require('express');
const router = express.Router();

// Import route files
const homeRoutes = require('./homeRoutes');
const postApiRoutes = require('./api/postApiRoutes');
const userApiRoutes = require('./api/userApiRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

// Define routes
router.use('/', homeRoutes);
router.use('/api/posts', postApiRoutes);
router.use('/api/users', userApiRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;
