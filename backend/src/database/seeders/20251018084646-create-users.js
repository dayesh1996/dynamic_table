'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('Password@123', 10);

    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuidv4(),
          email: 'dayesh1996@gmail.com',
          password: passwordHash,
          name: 'Dayesh',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'dayesh1996@gmail.com' }, {});
  },
};
