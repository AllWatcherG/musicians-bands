const {Model ,Sequelize, sequelize} = require('./db');

class Song extends Model{

}

Song.init({title: Sequelize.STRING, year: Sequelize.NUMBER }, {sequelize})

module.exports = {
    Song
};