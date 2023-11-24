const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Availability = require('./Availability');
const Event = require('./Event');
const User = require('./User');
const UserEvent = require('./UserEvent');

//Users to Events: One-to-Many
User.hasMany(Event, {
    foreignKey: 'CreatorID',
    onDelete: 'CASCADE'
});
  
Event.belongsTo(User, {
    foreignKey: 'CreatorID'
});
  
//Events to Users: Many-to-Many through UserEvents
User.belongsToMany(Event, {
    through: UserEvent,
    foreignKey: 'UserID'
});
  
Event.belongsToMany(User, {
    through: UserEvent,
    foreignKey: 'EventID'
});

//Users to UserEvents: One-to-Many
User.hasMany(UserEvent, {
    foreignKey: 'UserID',
    onDelete: 'CASCADE'
});
  
UserEvent.belongsTo(User, {
    foreignKey: 'UserID'
});

//UserEvents to Availability: One-to-Many
UserEvent.hasMany(Availability, {
    foreignKey: 'UserEventID',
    onDelete: 'CASCADE'
});
  
Availability.belongsTo(UserEvent, {
    foreignKey: 'UserEventID'
});
  
module.exports = {sequelize, User, Event, UserEvent, Availability};
  
