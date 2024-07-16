'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('utilizadors', 'idTipoUtilizador', {
            type: Sequelize.INTEGER
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('utilizadors', 'idTipoUtilizador');
    }
};