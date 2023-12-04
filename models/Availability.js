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
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        // This section may need adjusting in line with our calendar package
            // We may need additional attributes for multiple dates and multiple availabilities with in each date
        start: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end: {
            type: DataTypes.DATE,
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