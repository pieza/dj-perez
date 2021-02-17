const { Sequelize } = require('sequelize')


// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
})

module.exports = sequelize