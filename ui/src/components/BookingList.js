import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = ({ setShowForm }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/booking/all');
        setBookings(response.data.bookings);
      } catch (err) {
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Booking List</h2>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => {
            debugger;
            setShowForm(true)
          }}
        >
          New Booking
        </button>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Vehicle ID</th>
            <th className="border border-gray-300 px-4 py-2">Start Date</th>
            <th className="border border-gray-300 px-4 py-2">End Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{booking.id}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{booking.vehicleId}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(booking.startDate).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(booking.endDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
