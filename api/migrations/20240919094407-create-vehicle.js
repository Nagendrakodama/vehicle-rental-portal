'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the Vehicles table
    await queryInterface.createTable('Vehicles', {
      vehicleId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vehicleTypeId: {
        type: Sequelize.INTEGER,
        allowNull: true,  // Set allowNull to true since we have ON DELETE SET NULL
        references: {
          model: 'VehicleTypes',  // References the VehicleTypes table
          key: 'vehicleTypeId'               // The id column of VehicleTypes
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'      // Allows setting the typeId to NULL if VehicleType is deleted
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
    await queryInterface.bulkInsert('Vehicles', [
      {
        name: 'Maruti Swift',
        vehicleTypeId: 1, // Corresponds to Hatchback
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Toyota Fortuner',
        vehicleTypeId: 1, // Corresponds to SUV
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Honda City',
        vehicleTypeId: 1, // Corresponds to Sedan
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Royal Enfield',
        vehicleTypeId: 2, // Corresponds to Cruiser (bike)
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all records from the Vehicles table
    //await queryInterface.bulkDelete('Vehicles', null, {});

    // Drop the Vehicles table
    //await queryInterface.dropTable('Vehicles');
  }
};
