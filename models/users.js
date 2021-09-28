const{DataTypes} = require("sequelize");
const db = require("../db");


const User = db.define("user", {
    email: {
        require: true,
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        require: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        require: false,
        type: DataTypes.STRING(50)
    },
    role: {
        require: false,
        type: DataTypes.ENUM,
        values: ['admin', 'leader', 'member'],
        defaultValue: 'member'
    }
});

module.exports = User;