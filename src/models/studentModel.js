const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const student = sequelize.define('student', {
    id_student: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    phonenumber: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'aspirante'
    }
}, {
    tableName: 'student', // Nombre de la tabla en la base de datos
    timestamps: false // Si tus tablas no tienen campos de createdAt y updatedAt
});

module.exports = student;