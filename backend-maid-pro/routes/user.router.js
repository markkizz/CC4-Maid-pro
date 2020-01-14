const userController = require('../controllers/user.controller');

module.exports = (server, db) => {
  const controller = userController(db);

  server.post('/users/register', controller.signUp);

  server.post('/users/sign-in', controller.signIn);

  server.get('/users/:id', (req, res) => {
    const result = req.query.type;
    console.log(result, req.params.id)
  });


};