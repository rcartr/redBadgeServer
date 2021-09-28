const { DataTypes } = require('sequelize');
const db = require('../db');

const Events = db.define('events', {
    eventName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    eventDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
});

module.exports = Events;