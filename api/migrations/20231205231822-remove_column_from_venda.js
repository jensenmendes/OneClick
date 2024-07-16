'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('vendas', 'idLoja')
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('vendas', 'idLoja', {
            type: Sequelize.INTEGER,
            allowNull: false,
        });
    }
};