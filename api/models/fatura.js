'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fatura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fatura.init({
    data: DataTypes.DATE,
    hora: DataTypes.TIME,
    idVenda: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fatura',
  });
  return Fatura;
};