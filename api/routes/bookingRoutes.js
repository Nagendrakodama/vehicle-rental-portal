module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      vehicleId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    });
  
    Booking.associate = function(models) {
      Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
    };
  
    return Booking;
  };
  