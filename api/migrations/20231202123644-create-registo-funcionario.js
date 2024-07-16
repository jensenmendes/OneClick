'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RegistoFuncionarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data: {
        type: Sequelize.DATE
      },
      numeroVenda: {
        type: Sequelize.INTEGER
      },
      horaEntrada: {
        type: Sequelize.TIME
      },
      horaSaida: {
        type: Sequelize.TIME
      },
      idFuncionario: {
        type: Sequelize.INTEGER
      },
      idCaixa: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RegistoFuncionarios');
  }
};