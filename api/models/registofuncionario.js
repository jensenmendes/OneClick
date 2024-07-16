'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegistoFuncionario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RegistoFuncionario.init({
    data: DataTypes.DATE,
    numeroVenda: DataTypes.INTEGER,
    horaEntrada: DataTypes.TIME,
    horaSaida: DataTypes.TIME,
    idFuncionario: DataTypes.INTEGER,
    idCaixa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RegistoFuncionario',
  });
  return RegistoFuncionario;
};