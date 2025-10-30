'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: '123456',
        profileImage: null,
        provider: 'local',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'João Silva',
        email: 'joao.silva@gmail.com',
        password: null, 
        profileImage: 'https://i.pravatar.cc/150?img=12',
        provider: 'google',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Maria Souza',
        email: 'maria.souza@gmail.com',
        password: null,
        profileImage: 'https://i.pravatar.cc/150?img=15',
        provider: 'google',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
