'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Produto extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ CategoriaProduto, TransacaoVenda, ProdutoFornecedor, Devolucao }) {
            // define association here
            this.belongsTo(CategoriaProduto, { foreignKey: 'idCategoria', as: 'categoria' })
            this.hasMany(TransacaoVenda, { foreignKey: 'idProduto' })
            this.hasMany(ProdutoFornecedor, { foreignKey: 'idProduto' })
            this.hasMany(Devolucao, { foreignKey: 'idProduto' })

        }
    }
    Produto.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagem: DataTypes.BLOB,
        preco: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        quantidade: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        idCategoria: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Produto',
    });
    return Produto;
};