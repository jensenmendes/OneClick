'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Caixa extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Venda }) {
            // define association here
            this.hasMany(Venda, { foreignKey: 'idCaixa' })
        }
    }
    Caixa.init({
        nomeCaixa: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Caixa',
    });
    return Caixa;
};