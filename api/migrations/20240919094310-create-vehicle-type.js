'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create VehicleType table
    await queryInterface.createTable('VehicleType', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      noOfWheels: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    // Insert a couple of rows into VehicleType table
    await queryInterface.bulkInsert('VehicleType', [
      {
        noOfWheels: 4,
        name: 'SUV',
      },
      {
        noOfWheels: 4,
        name: 'Sedan',
      },
      {
        noOfWheels: 4,
        name: 'Hatchback',
      },
      {
        noOfWheels: 2,
        name: 'Motorbike',
      },
      {
        noOfWheels: 2,
        name: 'Scooter',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the VehicleType table
    await queryInterface.dropTable('VehicleType');
  }
};
