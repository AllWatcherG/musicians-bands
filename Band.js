const {Model ,Sequelize, sequelize} = require('./db');

// TODO - define the Band model
// let Band = sequelize.define('Band', {
//     name: DataTypes.STRING,
//     instrument: DataTypes.STRING
// })
class Band extends Model{
    
}
Band.init({name : Sequelize.STRING, instrument: Sequelize.STRING}, {sequelize})
module.exports = {
    Band
};