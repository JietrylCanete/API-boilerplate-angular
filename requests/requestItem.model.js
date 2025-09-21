// requests/requestItem.model.js
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
  };

  const options = {
    timestamps: false
  };

  return sequelize.define('requestItem', attributes, options);
}


