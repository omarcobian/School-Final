const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const teacher = sequelize.define('teacher',{
    id_teacher:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday:{
        type: DataTypes.DATE,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
    },
    phonenumber:{
        type: DataTypes.STRING
    },
    specialty:{
        type: DataTypes.STRING
    }},
    {
        tableName: 'teacher', //Nombre de la tabla en la base de datos
        timestamps: false //Si tus tablas no tienen campos
    }
);

module.exports = teacher;