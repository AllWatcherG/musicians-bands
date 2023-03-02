const { DataTypes } = require('sequelize');
const {Model, Sequelize, sequelize} = require('./db');

// TODO - define the Musician model
// let Musician = sequelize.define('Musician', {
//     name: DataTypes.STRING,
//     genre: DataTypes.STRING
// })
class Musician extends Model{

}

Musician.init({name: Sequelize.STRING, instrument: Sequelize.STRING}, {sequelize})

module.exports = {
    Musician
};