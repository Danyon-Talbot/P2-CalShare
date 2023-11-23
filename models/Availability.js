const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Availability extends Model {}

Availability.init(
    {
        AvailabilityID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UserEventID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'userEvent',
                key: 'UserEventID'
            }
        },
        // This section may need adjusting in line with our calendar package
            // We may need additional attributes for multiple dates and multiple availabilities with in each date
        Date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        StartTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        EndTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        Status: {
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