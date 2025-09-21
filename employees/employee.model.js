// employees/employee.model.js
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    position: { type: DataTypes.STRING, allowNull: false },

    // 🔥 Instead of string, we link to Department
    departmentId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'departments', // must match your department model name
        key: 'id'
      }
    },

    hireDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Active' } // Active / Inactive
  };

  const options = {
    timestamps: false
  };

  return sequelize.define('employee', attributes, options);
}
