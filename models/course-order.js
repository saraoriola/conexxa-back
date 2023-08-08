'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseOrder extends Model { static associate(models) {
  }}

  CourseOrder.init({}, {
    sequelize,
    modelName: 'CourseOrder',
  });

  return CourseOrder;
};
