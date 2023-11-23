const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
require('dotenv').config();

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);