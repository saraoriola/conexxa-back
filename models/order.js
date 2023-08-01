'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' });

      // DUDA A SOFI
      Order.hasMany(models.Course, { foreignKey: 'courseId' });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2)
  }, 
  {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};
