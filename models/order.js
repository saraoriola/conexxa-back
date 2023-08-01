const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Relación One-to-One con el modelo User (Un pedido pertenece a un usuario)
      Order.belongsTo(models.User, { foreignKey: 'userId' });

      // Relación One-to-One con el modelo Course (Un pedido pertenece a un curso)
      Order.belongsTo(models.Course, { foreignKey: 'courseId' });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
