var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
  id: String,
  guest_name: String,
  hotel_name: String,
  arrival_date: String,
  departure_date: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reservation', ReservationSchema);