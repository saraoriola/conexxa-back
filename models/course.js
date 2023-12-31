'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.Review);
      Course.belongsTo(models.User);
      Course.belongsToMany(models.Order, { through: models.CourseOrder, foreignKey: 'courseId', as: 'orders' });
      Course.belongsTo(models.Category);
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
