'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Booking table
    await queryInterface.createTable('Booking', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vehicle', // Referencing the Vehicle table
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: Delete bookings if the vehicle is deleted
        onUpdate: 'CASCADE',
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Insert a couple of rows into Booking table
    await queryInterface.bulkInsert('Booking', [
      {
        firstName: 'John',
        lastName: 'Doe',
        vehicleId: 1, // Assuming 1 corresponds to 'Ford Explorer'
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-09-05'),
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        vehicleId: 4, // Assuming 4 corresponds to 'Yamaha FZ'
        startDate: new Date('2024-10-01'),
        endDate: new Date('2024-10-10'),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the Booking table
    await queryInterface.dropTable('Booking');
  }
};
