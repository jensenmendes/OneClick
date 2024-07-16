'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLogado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserLogado.init({
    utilizador: DataTypes.STRING,
    pdv: DataTypes.STRING,
    estado: DataTypes.STRING,
    referencia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserLogado',
  });
  return UserLogado;
};