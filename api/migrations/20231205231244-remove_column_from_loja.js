'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('lojas', 'idGestor')
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('lojas', 'idGestor', {
            type: Sequelize.INTEGER
        });
    }
};