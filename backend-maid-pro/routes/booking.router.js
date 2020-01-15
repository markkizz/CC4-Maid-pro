const bookingController = require('../controllers/booking.controller')
module.exports = (server, db) => {
    const controller = bookingController(db)
    server.post('/bookings', controller.createBooking);
};