const { Sequelize, DataTypes } = require('sequelize')
const db = require('../db')

const Events = db.define('Events', {
  id: {
    type: DataTypes.INTEGER, 
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.STRING
  },
  server_id: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  },
  action: {
    type: DataTypes.STRING
  }
})

module.exports = Events