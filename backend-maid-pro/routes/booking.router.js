const bookingController = require('../controllers/booking.contfroller')
module.exports = (server, db) => {
    const controller = bookingController(db)
    server.post('/bookings', controller.createBooking);
    server.get('/bookings/employers/:employerId', controller.findBookingsByEmployerId);
};

 