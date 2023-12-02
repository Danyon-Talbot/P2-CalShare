const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Availability = require('./Availability');
const Event = require('./Event');
const User = require('./User');
const UserEvent = require('./UserEvent');

//Users to Events: One-to-Many
User.hasMany(Event, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});
  
Event.belongsTo(User, {
    foreignKey: 'id'
});
  
//Events to Users: Many-to-Many through UserEvents
User.belongsToMany(Event, {
    through: UserEvent,
    foreignKey: 'id'
});
  
Event.belongsToMany(User, {
    through: UserEvent,
    foreignKey: 'id'
});

//Users to UserEvents: One-to-Many
User.hasMany(UserEvent, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});
  
UserEvent.belongsTo(User, {
    foreignKey: 'id'
});

//UserEvents to Availability: One-to-Many
UserEvent.hasMany(Availability, {
    foreignKey: 'user_event_id', //What is this referencing?
    onDelete: 'CASCADE'
});
  
Availability.belongsTo(UserEvent, {
    foreignKey: 'user_event_id' //What is this referencing?
});
  
module.exports = {sequelize, User, Event, UserEvent, Availability};
  
