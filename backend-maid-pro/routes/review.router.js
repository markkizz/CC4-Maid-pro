const reviewController = require('../controllers/review.controller');
const passport = require('passport');

module.exports = (server, db) => {
	server.post('/add-review/:maid_id', passport.authenticate('jwt', { session: false }), reviewController.addReview);
};