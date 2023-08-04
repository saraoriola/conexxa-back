'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasOne(models.Token, { foreignKey: 'orderId', as: 'token' });
      Order.belongsToMany(models.Course, {
        through: models.CourseOrder,
        foreignKey: 'orderId',
        as: 'courses'
      });
      Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Order.init({
    price: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};
