'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.Review, { foreignKey: 'courseId', as: 'reviews' });
      Course.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Course.belongsToMany(models.Order, { through: models.CourseOrder, foreignKey: 'courseId', as: 'orders' });
      Course.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    }
  }

  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    userId: DataTypes.INTEGER,
    company: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });

  return Course;
};
