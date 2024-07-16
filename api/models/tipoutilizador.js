'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TipoUtilizador extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Utilizador }) {
            // define association here
            this.hasMany(Utilizador, { foreignKey: 'idTipoUtilizador' })
        }
    }
    TipoUtilizador.init({
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'TipoUtilizador',
    });
    return TipoUtilizador;
};