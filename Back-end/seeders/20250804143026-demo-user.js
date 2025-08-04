'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'João Carlos',
        email: 'joao@example.com',
        password: await bcrypt.hash('123456', 10),
        profileImage: 'profile1.jpg',
        provider: 'local',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maria Silva',
        email: 'maria@example.com',
        password: await bcrypt.hash('abcdef', 10),
        profileImage: 'profile2.jpg',
        provider: 'local',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
