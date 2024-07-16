'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('vendas', 'idFuncionario');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('vendas', 'idFuncionario', {
            type: DataTypes.INTEGER,
            allowNull: false
        });
    }
};