'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Devolucao extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Venda, Cliente, Produto }) {
            // define association here
            this.belongsTo(Produto, { foreignKey: 'idProduto', as: 'produto' })
            this.belongsTo(Venda, { foreignKey: 'idVenda' })
            this.belongsTo(Cliente, { foreignKey: 'idCliente', as: 'cliente' })
        }
    }
    Devolucao.init({
        data: { type: DataTypes.DATE, allowNull: false },
        motivo: { type: DataTypes.STRING, allowNull: false },
        quantidade: { type: DataTypes.DOUBLE, allowNull: false },
        metodo: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
        valor: { type: DataTypes.DOUBLE, allowNull: false },
        idVenda: { type: DataTypes.INTEGER, allowNull: false },
        idCliente: DataTypes.INTEGER,
        idProduto: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        sequelize,
        modelName: 'Devolucao',
    });
    return Devolucao;
};