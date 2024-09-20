// models/Vehicle.js
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'VehicleType', // Name of the referenced table
        key: 'id', // Key in VehicleType table to reference
      },
      allowNull: false,
      onDelete: 'CASCADE', // Delete vehicle if the VehicleType is deleted
    },
  }, {
    tableName: 'Vehicle',
    timestamps: false,
  });

  Vehicle.associate = function(models) {
    Vehicle.belongsTo(models.VehicleType, { foreignKey: 'vehicleTypeId' });
  };

  return Vehicle;
};
