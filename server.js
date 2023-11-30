const express = require('express');
const session = require('express-session');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const handlebars = require('express-handlebars');
const routes = require('./controllers');
const homeRoutes = require('./controllers/homeRoutes');
const withAuth = require('./utils/auth'); // Import the withAuth middleware

const app = express();
const PORT = process.env.PORT || 3001;

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Use session middleware with the defined configuration
app.use(session(sess));

// Sets handlebars configurations
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  extname: 'hbs',
  defaultLayout: 'index'
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use(routes);

// Home route with authentication
app.get('/', withAuth, (req, res) => {
  res.render('homepage', { layout: 'index', logged_in: req.session.logged_in });
});

// Login/Sign Up route
app.get('/auth', (req, res) => {
  res.render('auth', {
    logged_in: req.session.logged_in
  });
});

// Use the homeRoutes and apply withAuth middleware
app.use('/home', withAuth, homeRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening to http://localhost:${PORT}`));
});
