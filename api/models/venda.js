'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Venda extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Caixa, Cliente, TransacaoVenda, Pagamento, Devolucao, Utilizador }) {
            // define association here
            this.belongsTo(Caixa, { foreignKey: 'idCaixa', as: 'caixa' })
            this.belongsTo(Utilizador, { foreignKey: 'idUtilizador', as: 'Vendedor' })
            this.belongsTo(Cliente, { foreignKey: 'idCliente', as: 'cliente' })
            this.hasMany(TransacaoVenda, { foreignKey: 'idVenda' })
            this.hasMany(Pagamento, { foreignKey: 'idVenda' })
            this.hasMany(Devolucao, { foreignKey: 'idVenda' })
        }
    }
    Venda.init({
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        idCaixa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idUtilizador: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCliente: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Venda',
    });
    return Venda;
};