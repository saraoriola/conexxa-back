'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Course, { through: models.CourseOrder });
      Order.belongsTo(models.User, { foreignKey: 'userId' }); 
    }
  }

  Order.init({
    price: DataTypes.DECIMAL(10, 2),
    userId: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};
