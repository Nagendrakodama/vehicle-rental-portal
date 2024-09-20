// models/VehicleType.js
module.exports = (sequelize, DataTypes) => {
  const VehicleType = sequelize.define('VehicleType', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    noOfWheels: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'VehicleType',
    timestamps: false,
  });

  return VehicleType;
};
