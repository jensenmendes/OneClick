'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('funcionarios', 'funcao', {
            type: Sequelize.STRING,
            allowNull: false,
        });

        await queryInterface.addColumn('funcionarios', 'sexo', {
            type: Sequelize.STRING,
            allowNull: false,
        });

        await queryInterface.addColumn('funcionarios', 'localidade', {
            type: Sequelize.STRING,
            allowNull: false,
        });

        await queryInterface.addColumn('funcionarios', 'ilha', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('funcionarios', 'funcao');
        await queryInterface.removeColumn('funcionarios', 'sexo');
        await queryInterface.removeColumn('funcionarios', 'localidade');
        await queryInterface.removeColumn('funcionarios', 'ilha');
    }
};