const { Vehicle, VehicleType } = require('../models');

const VehicleController = {

    async getVehiclesByNoOfWheels(noOfWheels) {
        try {
          const vehicles = await Vehicle.findAll({
            include: [{
              model: VehicleType,
              as: 'vehicleType',
              where: { NoOfWheels: noOfWheels }, // Filter by the number of wheels
            }]
          });
    
          return vehicles;
        } catch (error) {
          console.error('Error fetching vehicles by number of wheels:', error);
          throw error;
        }
      },

  async getVehiclesByNoOfWheels(req, res) {
    const { noOfWheels } = req.params;

    try {
      const vehicleTypes = await VehicleType.findAll({
        where: {
          noOfWheels: noOfWheels,
        },
      });
      return res.status(200).json(vehicleTypes);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching vehicles' });
    }
  },

  async getAllVehicles(req, res) {
    const { vehicleTypeId } = req.params; 

    try {
      const vehicles = await Vehicle.findAll({
        where: {
          vehicleTypeId: vehicleTypeId,
        },
      });
      return res.status(200).json(vehicles);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching vehicles' });
    }
  }
};

module.exports = VehicleController;
