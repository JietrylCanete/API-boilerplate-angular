// requests/request.model.js
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    title: { type: DataTypes.STRING, allowNull: false }, // Equipment, Resources, Leave
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Pending' }
  };

  const options = {
    timestamps: true
  };

  return sequelize.define('request', attributes, options);
}

