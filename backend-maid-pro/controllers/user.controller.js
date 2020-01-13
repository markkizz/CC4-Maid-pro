const userService = require('../services/user.service');

module.exports = (db) => {
  const service = userService(db);

  return {
    signUp: async (req, res) => {
      const result = await service.signUp(req, req.body);
      res.json(result);
    }
  }
};
