const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/api/userRoutes');
// const eventRoutes = require('./routes/api/eventRoutes');
const sequelize = require('./config/connection');

const sessionSecret = process.env.SESSION_SECRET;

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/', routes);
app.use('/api/users', userRoutes);
// app.use('/api/events', eventRoutes);


app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.render('login', { title: 'CalShare: Login' }));
app.get('/signup', (req, res) => res.render('signup', { title: 'Sign Up to CalShare' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


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
