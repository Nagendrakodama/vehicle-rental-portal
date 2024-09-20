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
          model: 'VehicleType', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
      },
    });

    // Insert a couple of rows into Vehicle table
    await queryInterface.bulkInsert('Vehicle', [
      // Vehicles for 'SUV'
      { name: 'Ford Explorer', vehicleTypeId: 1 }, 
      { name: 'Chevrolet Tahoe', vehicleTypeId: 1 },
      { name: 'Jeep Wrangler', vehicleTypeId: 1 },

      // Vehicles for 'Sedan'
      { name: 'Toyota Corolla', vehicleTypeId: 2 },
      { name: 'Honda Accord', vehicleTypeId: 2 },
      { name: 'Hyundai Elantra', vehicleTypeId: 2 },

      // Vehicles for 'Hatchback'
      { name: 'Ford Focus', vehicleTypeId: 3 }, 
      { name: 'Volkswagen Golf', vehicleTypeId: 3 },
      { name: 'Honda Fit', vehicleTypeId: 3 },

      // Vehicles for 'Motorbike'
      { name: 'Yamaha FZ', vehicleTypeId: 4 }, 
      { name: 'Honda CBR', vehicleTypeId: 4 },
      { name: 'Suzuki Hayabusa', vehicleTypeId: 4 },

      // Vehicles for 'Scooter'
      { name: 'Honda Activa', vehicleTypeId: 5 }, 
      { name: 'TVS Jupiter', vehicleTypeId: 5 },
      { name: 'Suzuki Access', vehicleTypeId: 5 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vehicle');
  }
};
