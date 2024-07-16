'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategoriaProduto extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Produto }) {
            // define association here
            this.hasMany(Produto, { foreignKey: 'idCategoria' })
        }
    }
    CategoriaProduto.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagem: DataTypes.BLOB
    }, {
        sequelize,
        modelName: 'CategoriaProduto',
    });
    return CategoriaProduto;
};