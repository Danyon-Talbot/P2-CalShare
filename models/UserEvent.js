const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserEvent extends Model {}

UserEvent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
                key: 'id'
            }
        },
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