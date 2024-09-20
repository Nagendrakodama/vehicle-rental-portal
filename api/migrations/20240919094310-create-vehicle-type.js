'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the VehicleTypes table
    await queryInterface.createTable('VehicleTypes', {
      vehicleTypeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      NoOfWheels: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isIn: [[2, 4]]  // Only allow 2 or 4
        }
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

     // Insert data into the Vehicles table
     await queryInterface.bulkInsert('VehicleTypes', [
      {
        name: 'Sports',
        NoOfWheels: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SUV',
        NoOfWheels: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cruiser',
        NoOfWheels: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sedan',
        NoOfWheels: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ], {});
  },

  

  async down(queryInterface, Sequelize) {
    // Drop the VehicleTypes table
    await queryInterface.dropTable('VehicleTypes');
  }
};
