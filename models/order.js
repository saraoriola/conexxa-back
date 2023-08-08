'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Course, {through: models.CourseOrder});
      Order.belongsTo(models.User);
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
