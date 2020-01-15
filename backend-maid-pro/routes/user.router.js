const userController = require('../controllers/user.controller');

module.exports = (server, db) => {
  const controller = userController(db);

  server.post('/users/register', controller.signUp);

  server.post('/users/sign-in', controller.signIn);

<<<<<<< HEAD
<<<<<<< Updated upstream
  server.get('/users/maids', (req, res) => controller.findMaids(req, res))
=======
  server.get('/users/maids', (req, res) => controller.findMaids(req, res));

>>>>>>> 247a14abdee434e439b95e2c882368d91a1d3306
};
=======
  server.get('/users/maids',(req,res) => controller.findMaids(req,res))

  server.get('/users/maid/:id',(req,res) => controller.findDescriptionMaid(req,res))
};
>>>>>>> Stashed changes
