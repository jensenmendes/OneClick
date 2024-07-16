'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pagamento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Venda }) {
            // define association here
            this.belongsTo(Venda, { foreignKey: 'idVenda' })
        }
    }
    Pagamento.init({
        metodo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valorTotal: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        valorRecebido: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        troco: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false
        },
        idVenda: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Pagamento',
    });
    return Pagamento;
};