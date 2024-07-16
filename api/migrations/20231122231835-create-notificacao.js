'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notificacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      receptor: {
        type: Sequelize.STRING
      },
      conteudo: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.DATE
      },
      idUtilizador: {
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
    await queryInterface.dropTable('Notificacaos');
  }
};