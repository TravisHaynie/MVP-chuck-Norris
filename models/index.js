const User = require('./models/user'); // Import User model
const Post = require('./models/post'); // Import Post model
const Comment = require('.models/comment'); // Import Comment model

// Define associations
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Post, Comment }; // Export models
