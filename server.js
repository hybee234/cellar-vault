const express = require('express');
const session = require('express-session');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const handlebars = require('express-handlebars');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000, // 24 hours in milliseconds
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax',
  },
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


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening to http://localhost:${PORT}`));
});
