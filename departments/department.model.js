// departments/department.model.js
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    employeeCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  };

  const options = {
    timestamps: false
  };

  return sequelize.define('department', attributes, options);
}
