const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicleController');

// Route to get vehicles by number of wheels
router.get('/vehicles/wheels/:noOfWheels', VehicleController.getVehiclesByNoOfWheels);

module.exports = router;
