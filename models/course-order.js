'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseOrder extends Model {}

  CourseOrder.init({}, {
    sequelize,
    modelName: 'CourseOrder',
  });

  return CourseOrder;
};
