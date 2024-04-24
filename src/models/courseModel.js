const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Course = sequelize.define('course', {
    id_course: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    schedule: {
        type: DataTypes.DATE,
        allowNull: false
    },
    course_group:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'course',
    timestamps: false
});

module.exports = Course;