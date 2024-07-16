'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProdutoFornecedor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Fornecedor, Produto }) {
            // define association here
            this.belongsTo(Fornecedor, { foreignKey: 'idFornecedor' })
            this.belongsTo(Produto, { foreignKey: 'idProduto' })
        }
    }
    ProdutoFornecedor.init({
        idProduto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idFornecedor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nota: DataTypes.STRING,
        custo: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ProdutoFornecedor',
    });
    return ProdutoFornecedor;
};