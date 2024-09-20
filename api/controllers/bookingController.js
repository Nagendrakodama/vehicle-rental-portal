const { Booking } = require('../models');
const { Op } = require('sequelize');

exports.bookVehicle = async (req, res) => {
  const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

  const existingBooking = await Booking.findOne({
    where: {
      vehicleId,
      [Op.or]: [
        { startDate: { [Op.between]: [startDate, endDate] } },
        { endDate: { [Op.between]: [startDate, endDate] } }
      ]
    }
  });
  if (existingBooking) {
    return res.status(400).json({ message: 'Vehicle is already booked for these dates' });
  }
  try {
    const newBooking = await Booking.create({
      firstName,
      lastName,
      vehicleId,
      startDate,
      endDate,
    });
    console.log('New booking added:', newBooking);
    return res.status(200).json({ message: 'Booking successful', newBooking });
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }

};

exports.getAll = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
    });
    return res.status(200).json({ message: 'Booking retrived successful', bookings });
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error; 
  }

};

