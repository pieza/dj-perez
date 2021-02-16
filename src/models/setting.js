const { Sequelize, DataTypes } = require('sequelize')
const db = require('../db')

const Setting = db.define('Setting', {
  id: {
    type: DataTypes.INTEGER, 
    autoIncrement: true,
    primaryKey: true
  },
  server_id: {
    type: DataTypes.STRING
  },
  property: {
    type: DataTypes.STRING
  },
  value: {
    type: DataTypes.STRING
  }
})

module.exports = Setting