'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TransacaoVenda extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Produto, Venda }) {
            // define association here
            this.belongsTo(Produto, { foreignKey: 'idProduto', as: 'produto' })
            this.belongsTo(Venda, { foreignKey: 'idVenda' })
        }
    }
    TransacaoVenda.init({
        idProduto: { type: DataTypes.INTEGER, allowNull: false },
        quantida: { type: DataTypes.DOUBLE, allowNull: false },
        iva: { type: DataTypes.DOUBLE, allowNull: false },
        total: { type: DataTypes.DOUBLE, allowNull: false },
        idVenda: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        sequelize,
        modelName: 'TransacaoVenda',
    });
    return TransacaoVenda;
};