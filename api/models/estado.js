'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Estado extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Utilizador }) {
            // define association here
            this.hasMany(Utilizador, { foreignKey: 'idEstado' })
        }
    }
    Estado.init({
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Estado',
    });
    return Estado;
};