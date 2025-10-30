'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('todos', [
      {
        title: 'Estudar Node.js',
        description: 'Revisar conceitos de Express, JWT e Sequelize.',
        status: 'a_fazer',
        userId: 1, 
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Criar autenticação com Google OAuth',
        description: 'Integrar login com conta Google no sistema.',
        status: 'em_progresso',
        userId: 2,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/300/300221.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Finalizar layout do dashboard',
        description: 'Ajustar responsividade e dark mode.',
        status: 'finalizado',
        userId: 3, 
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {});
  }
};
