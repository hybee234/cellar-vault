const express = require('express');
const session = require('express-session');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const handlebars = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = handlebars.create({ helpers });

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
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
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine

  // , handlebars({
  //   layoutsDir: path.join(__dirname, '/views/layouts'),
  //   partialsDir: path.join(__dirname, '/views/partials'),
  //   extname: 'handlebars',
  //   defaultLayout: 'main'
  // })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening to http://localhost:${PORT}`));
});
