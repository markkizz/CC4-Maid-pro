const userController = require('../controllers/user.controller');

module.exports = (server, db) => {
  const controller = userController(db);

  server.post('users/register', controller.signUp);

};