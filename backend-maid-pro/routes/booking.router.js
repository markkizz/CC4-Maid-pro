const passport = require('passport')
const bookingController = require('../controllers/booking.controller')
module.exports = (server, db) => {
    const controller = bookingController(db)
    server.post('/bookings', controller.createBooking);
    // ? should pass with auth
    server.get('/bookings/employers/:employerId', controller.findBookingsByEmployerId);

    server.get('/bookings/maids/',passport.authenticate('jwt', { session: false }), controller.findBookingsByMaidId)
};
