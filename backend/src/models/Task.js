const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Task = db.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
});

module.exports = Task
