'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the Users table
    await queryInterface.createTable('Users', {
        userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Insert sample data into Users table
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Nagendra',
        lastName: 'Kodama',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Nani',
        lastName: 'Katakam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Bujji',
        lastName: 'Katakam',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all records from Users table
    await queryInterface.bulkDelete('Users', null, {});

    // Drop the Users table
    await queryInterface.dropTable('Users');
  }
};
