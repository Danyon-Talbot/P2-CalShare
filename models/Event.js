const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
    {
        EventID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        EventName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CreatorID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'UserID'
            }
        },
        // will need to explore this further to ensure its functionality
        EventLink: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'event'
    }
);

module.exports = Event;