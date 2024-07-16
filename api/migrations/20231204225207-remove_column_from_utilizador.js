'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Remover as colunas
        await queryInterface.removeColumn('utilizadors', 'genero');
        await queryInterface.removeColumn('utilizadors', 'morada');
        await queryInterface.removeColumn('utilizadors', 'ilha');
    },

    async down(queryInterface, Sequelize) {
        // Adicionar as colunas de volta
        await queryInterface.addColumn('utilizadors', 'genero', {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.addColumn('utilizadors', 'morada', {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.addColumn('utilizadors', 'ilha', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    }
};