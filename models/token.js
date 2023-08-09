'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
    }
  }

  Token.init({
    token: DataTypes.STRING,
    userId: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Token',
  });

  return Token;
};
