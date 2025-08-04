'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Todos', [
      {
        title: 'Estudar Sequelize',
        description: 'Aprender como usar o Sequelize CLI para migrations e seeds.',
        imageUrl: 'study.jpg',
        userId: 1,
        status: 'a_fazer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Criar projeto Node.js',
        description: 'Montar estrutura com Express, Sequelize e JWT.',
        imageUrl: 'project.jpg',
        userId: 1,
        status: 'em_progresso',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Enviar currículo',
        description: 'Aplicar para vagas de estágio em desenvolvimento.',
        imageUrl: 'job.jpg',
        userId: 2,
        status: 'finalizado',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
