const db = require('../models');

function calculateNewAverageRating(oldRatingList, newRating) {
  let sum = 0;
  for (let rating of oldRatingList) {
    sum += rating.rating;
  }
  sum += newRating;
  return sum / (oldRatingList.length + 1);
}

exports.addReview = async function (req, res, next) {
  try {
    const { rating, content } = req.body;
    const { maid_id } = req.params;
    const ratingReview = await db.review.findAll({ where: { maid_id, employer_id: req.user.id } });
    const newReview = await db.review.create({ rating, content, maid_id, employer_id: req.user.id });
    await db.user.update({
      average_rating: calculateNewAverageRating(ratingReview, parseFloat(rating))
    }, { where: { id: maid_id } });
    res.status(201).send(newReview);
  } catch (err) {
    console.error(err);
    res.status(400).send({ errorMessage: err.message });
  }

};