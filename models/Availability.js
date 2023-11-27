const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Availability extends Model {}

Availability.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'userEvent',
                key: 'UserEventID'
            }
        },
        // This section may need adjusting in line with our calendar package
            // We may need additional attributes for multiple dates and multiple availabilities with in each date
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'availability'
    }
);

module.exports = Availability;