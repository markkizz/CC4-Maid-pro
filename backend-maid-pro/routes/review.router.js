const reviewController = require('../controllers/review.controller')

module.exports = (server, db) => {
	const controller = reviewController(db)

};