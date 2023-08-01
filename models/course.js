'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.Order, { foreignKey: 'courseId' });
      Course.hasMany(models.Review, { foreignKey: 'courseId' });
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
  }, 
  {
    sequelize,
    modelName: 'Course',
  });
  
  return Course;
};
