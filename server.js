const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
require('dotenv').config();
const exphbs = require('express-handlebars');
const path = require('path');


const sessionSecret = process.env.SESSION_SECRET;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
});

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

// Redirect to the login page when the root path ("/") is accessed
app.get('/', (req, res) => {
  res.redirect('/login'); 
});

// Render the login page
app.get('/login', (req, res) => {
  res.render('login', { title: 'CalShare: Login' });
});

// Render the signup page
app.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up to CalShare' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, // Session expiration time in milliseconds (1 hour)
    secure: false,
    httpOnly: true,
  },
}));


// check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });




// need to chat with whoever has been working on server.js
// this is meant to Synchronize the Database and start the application
// Setting force: false ensures that it doesn't drop and recreate the tables on every startup, preserving your data.

// const db = require('./models'); // Adjust the path to where your models folder is

// db.sequelize.sync({ force: false }).then(() => {
//   // Start your server
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });
