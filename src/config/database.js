//Conexion con la base de datos

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'omco21',
    database: 'school',
    port: 5432,
});

module.exports = { sequelize };
