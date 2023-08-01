const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Relación One-to-Many con el modelo Order (Un curso puede tener muchos pedidos)
      Course.hasMany(models.Order, { foreignKey: 'courseId' });

      // Relación One-to-Many con el modelo Review (Un curso puede tener muchas reviews)
      Course.hasMany(models.Review, { foreignKey: 'courseId' });

      // Relación One-to-One con el modelo User (Un curso pertenece a un usuario)
      Course.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    userId: DataTypes.INTEGER,
    company: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
