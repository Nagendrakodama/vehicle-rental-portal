const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');

router.post('/', BookingController.bookVehicle);
router.get('/all', BookingController.getAll);

module.exports = router;
