const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relación One-to-Many con el modelo Order (Un usuario puede tener muchos pedidos)
      User.hasMany(models.Order, { foreignKey: 'userId' });

      // Relación One-to-Many con el modelo Review (Un usuario puede dejar muchas reviews)
      User.hasMany(models.Review, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    company: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
