const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicleController');

router.get('/vehiclestypes/wheels/:noOfWheels', VehicleController.getVehiclesByNoOfWheels);
router.get('/vehicles/:vehicleTypeId', VehicleController.getAllVehicles);

module.exports = router;
