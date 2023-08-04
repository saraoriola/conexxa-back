'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Token.init({
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Token',
  });

  return Token;
};
