const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserEvent extends Model {}

UserEvent.init(
    {
        UserEventID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'UserID'
            }
        },
        EventID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
                key: 'EventID'
            }
        },
        Role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'UserEvent'
    }
);

module.exports = UserEvent;