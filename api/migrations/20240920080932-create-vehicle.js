'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Vehicle table
    await queryInterface.createTable('Vehicle', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vehicleTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'VehicleType', // Referencing the VehicleType table
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: If VehicleType is deleted, related vehicles are deleted
        onUpdate: 'CASCADE',
      },
    });

    // Insert a couple of rows into Vehicle table
    await queryInterface.bulkInsert('Vehicle', [
      // Vehicles for 'SUV'
      { name: 'Ford Explorer', vehicleTypeId: 1 }, // Assuming 1 corresponds to 'SUV'
      { name: 'Chevrolet Tahoe', vehicleTypeId: 1 },
      { name: 'Jeep Wrangler', vehicleTypeId: 1 },

      // Vehicles for 'Sedan'
      { name: 'Toyota Corolla', vehicleTypeId: 2 }, // Assuming 2 corresponds to 'Sedan'
      { name: 'Honda Accord', vehicleTypeId: 2 },
      { name: 'Hyundai Elantra', vehicleTypeId: 2 },

      // Vehicles for 'Hatchback'
      { name: 'Ford Focus', vehicleTypeId: 3 }, // Assuming 3 corresponds to 'Hatchback'
      { name: 'Volkswagen Golf', vehicleTypeId: 3 },
      { name: 'Honda Fit', vehicleTypeId: 3 },

      // Vehicles for 'Motorbike'
      { name: 'Yamaha FZ', vehicleTypeId: 4 }, // Assuming 4 corresponds to 'Motorbike'
      { name: 'Honda CBR', vehicleTypeId: 4 },
      { name: 'Suzuki Hayabusa', vehicleTypeId: 4 },

      // Vehicles for 'Scooter'
      { name: 'Honda Activa', vehicleTypeId: 5 }, // Assuming 5 corresponds to 'Scooter'
      { name: 'TVS Jupiter', vehicleTypeId: 5 },
      { name: 'Suzuki Access', vehicleTypeId: 5 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the Vehicle table
    await queryInterface.dropTable('Vehicle');
  }
};
