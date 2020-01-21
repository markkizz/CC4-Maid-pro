const passport = require('passport')
const bookingController = require('../controllers/booking.controller')
module.exports = (server, db) => {
    const controller = bookingController(db)
    server.post('/bookings/maids/:maidId', passport.authenticate('jwt', { session: false }), controller.createBooking);

    server.get('/bookings/employers/', passport.authenticate('jwt', { session: false }), controller.findBookingsByEmployerId);

    server.get('/bookings/maids/',passport.authenticate('jwt', { session: false }), controller.findBookingsByMaidId)
};
