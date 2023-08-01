const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Relación One-to-One con el modelo User (Una review pertenece a un usuario)
      Review.belongsTo(models.User, { foreignKey: 'userId' });

      // Relación One-to-One con el modelo Course (Una review pertenece a un curso)
      Review.belongsTo(models.Course, { foreignKey: 'courseId' });
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
