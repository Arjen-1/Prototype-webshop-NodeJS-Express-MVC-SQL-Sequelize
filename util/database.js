const Sequelize = require('sequelize');


const sequelize =  new Sequelize('nodecomplete', 'root', 'RSwachtwoord', {dialect:'mysql', host:'localhost'})

module.exports = sequelize ;