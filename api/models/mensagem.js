'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Mensagem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Utilizador }) {
            // define association here
            this.belongsTo(Utilizador, { foreignKey: 'idUtilizador', as: 'utilizador' })
        }

        //hide ID
        toJSON() {
            return {...this.get(), id: undefined }
        }
    }
    Mensagem.init({
        receptor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        assunto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        conteudo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idUtilizador: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Mensagem',
    });
    return Mensagem;
};