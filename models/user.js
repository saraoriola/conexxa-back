'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Course, { foreignKey: 'userId', as: 'courses' });
      User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
      User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });
      User.hasOne(models.Token, { foreignKey: 'userId', as: 'token' });
    }
  }

  User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    company: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
