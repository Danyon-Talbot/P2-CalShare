const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Availability = require('./Availability');
const Event = require('./Event');
const User = require('./User');
const UserEvent = require('./UserEvent');

//Users to Events: One-to-Many
User.hasMany(Event, {
    foreignKey: 'creator_id',
    onDelete: 'CASCADE'
});
  
Event.belongsTo(User, {
    foreignKey: 'creator_id'
});
  
//Events to Users: Many-to-Many through UserEvents
User.belongsToMany(Event, {
    through: UserEvent,
    foreignKey: 'user_id'
});
  
Event.belongsToMany(User, {
    through: UserEvent,
    foreignKey: 'event_id'
});

//Users to UserEvents: One-to-Many
User.hasMany(UserEvent, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
  
UserEvent.belongsTo(User, {
    foreignKey: 'user_id'
});

//User to Availability: One-to-Many
User.hasMany(Availability, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
  
Availability.belongsTo(User, {
    foreignKey: 'user_id'
});
  
module.exports = {sequelize, User, Event, UserEvent, Availability};
  
