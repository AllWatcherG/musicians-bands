const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('./db');

// TODO - define the Musician model
let Musician = sequelize.define('Musician', {
    name: DataTypes.STRING,
    genre: DataTypes.STRING
})

module.exports = {
    Musician
};