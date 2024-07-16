'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('utilizadors', 'idFuncionario');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('utilizadors', 'idFuncionario', {
            type: DataTypes.INTEGER,
            allowNull: false
        });
    }
};