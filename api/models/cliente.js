'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cliente extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Venda, Devolucao }) {
            // define association here
            this.hasMany(Venda, { foreignKey: 'idCliente' })
            this.hasMany(Devolucao, { foreignKey: 'idCliente' })
        }
    }
    Cliente.init({
        nome: { type: DataTypes.STRING, allowNull: false },
        localidade: { type: DataTypes.STRING, allowNull: false },
        ilha: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        telefone: { type: DataTypes.INTEGER, allowNull: false },
        cni: { type: DataTypes.STRING, allowNull: false, unique: true },
        nif: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        sequelize,
        modelName: 'Cliente',
    });
    return Cliente;
};