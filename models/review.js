'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.belongsTo(models.Course, { foreignKey: 'courseId' });
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    score: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Review',
  });
  
  return Review;
};
