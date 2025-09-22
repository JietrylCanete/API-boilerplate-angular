const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    acceptTerms: { type: DataTypes.BOOLEAN },
    role: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      defaultValue: 'User'
    },
    status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    verificationToken: { type: DataTypes.STRING },
    verified: { type: DataTypes.DATE },
    resetToken: { type: DataTypes.STRING },
    resetTokenExpires: { type: DataTypes.DATE },
    passwordReset: { type: DataTypes.DATE },
    created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE },
    isVerified: {
      type: DataTypes.VIRTUAL,
      get() { return !!(this.verified || this.passwordReset); }
    }
  };

  const options = {
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ['passwordHash'] }
    },
    scopes: {
      withHash: { attributes: {} }
    }
  };

  return sequelize.define('Account', attributes, options);
}
