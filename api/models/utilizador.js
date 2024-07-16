'use strict';
const {
    Model
} = require('sequelize');
const venda = require('./venda');
module.exports = (sequelize, DataTypes) => {
    class Utilizador extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Estado, Mensagem, Notificacao, TipoUtilizador, Venda }) {
            // define association here
            this.belongsTo(Estado, { foreignKey: 'idEstado', as: 'status' })
            this.belongsTo(TipoUtilizador, { foreignKey: 'idTipoUtilizador', as: 'Role' })
            this.hasMany(Mensagem, { foreignKey: 'idUtilizador' })
            this.hasMany(Notificacao, { foreignKey: 'idUtilizador' })
            this.hasMany(venda, { foreignKey: 'idUTilizador' })
        }

        //hide ID
        toJSON() {
            return {...this.get(), id: undefined }
        }
    }
    Utilizador.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foto: DataTypes.BLOB,
        idEstado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idTipoUtilizador: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Utilizador',
    });
    return Utilizador;
};