const userController = require('../controllers/user.controller');

module.exports = (server, db) => {
  const controller = userController(db);

  server.post('/users/register', controller.signUp);

  server.post('/users/sign-in', controller.signIn);

  server.get('/users/maids', (req, res) => controller.findMaids(req, res))
  
  server.get('/users/search', controller.searchMaids);
};
