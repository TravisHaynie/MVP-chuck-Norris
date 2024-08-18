const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
require('dotenv').config();

const { User, Post, Comment } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// Session setup
const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// Handlebars setup
const hbs = exphbs.create({
  defaultLayout: 'main', // Ensure this matches your layout file
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    currentYear: () => new Date().getFullYear(),
  },
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Import route files
const homeRoutes = require('./controllers/homeRoutes');
const postApiRoutes = require('./controllers/api/postApiRoutes');
const userApiRoutes = require('./controllers/api/userApiRoutes');
const postRoutes = require('./controllers/postRoutes');
const userRoutes = require('./controllers/userRoutes');

// Use route files
app.use('/', homeRoutes);
app.use('/api/posts', postApiRoutes);
app.use('/api/users', userApiRoutes);
app.use('/', postRoutes);
app.use('/', userRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}).catch(err => {
  console.error("Database sync error:", err);
});
