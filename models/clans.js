const { DataTypes } = require('sequelize');
const db = require('../db');

const Clans = db.define('clans', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Clans;