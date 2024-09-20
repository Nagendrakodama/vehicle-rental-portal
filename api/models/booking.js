// models/Booking.js
module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Vehicle', // Name of the referenced table
          key: 'id', // Key in Vehicle table to reference
        },
        allowNull: false,
        onDelete: 'CASCADE', // Optional: If the vehicle is deleted, bookings are deleted
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      tableName: 'Booking',
      timestamps: false,
    });
  
    Booking.associate = function(models) {
      Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
    };
  
    return Booking;
  };
  