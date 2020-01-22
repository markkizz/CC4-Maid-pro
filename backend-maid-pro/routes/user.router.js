const userController = require('../controllers/user.controller');
const passport = require('passport')

module.exports = (server, db) => {
  const controller = userController(db);

  server.post('/users/register', controller.signUp);

  server.post('/users/sign-in', controller.signIn);

  server.get('/users/maids', controller.findMaidsWithMaybeLimitOrderByAverageRatingDesc);

  server.get('/users/search', controller.searchMaids);

  server.get(
    '/users/my-booking',
    passport.authenticate('jwt', {}, { session: false }),
    controller.getMyBooking
  );
  server.get('/users/quicksearch', controller.findMaidsQuickSearch);

  server.get('/users/maids/:maidId', (req, res) => controller.findMaidByMaidId(req, res));

};
