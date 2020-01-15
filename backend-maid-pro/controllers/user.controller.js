const userService = require('../services/user.service');

module.exports = (db) => {
  const service = userService(db);

  return {
    signUp: async (req, res) => {
      try {
        const result = await service.signUp(req, req.body);
        const {
          httpStatus,
          message,
          errorMessage
        } = result;
        if (!errorMessage) {
          res.status(httpStatus).json(message);
        } else {
          res.status(httpStatus).json({
            errorMessage
          });
        }
      } catch (ex) {
        res.status(400).json({
          errorMessage: ex
        });
      }
    },

    signIn: async (req, res, next) => {
      const {
        httpStatus,
        message,
        errorMessage
      } = await service.signIn(req, res, next);
      try {
        if (!errorMessage) {
          res.status(httpStatus).json(message);
        } else {
          res.status(httpStatus).json({
            errorMessage: errorMessage
          });
        }
      } catch (ex) {
        res.status(400).json({
          errorMessage: ex.message
        });
      }
    },

    findMaids: async (req, res) => {
      try {
        const result = await service.findMaids(req.query.type)
        const {
          httpStatus,
          message,
          errorMessage
        } = result
        if (!errorMessage) {
          res.status(httpStatus).json(message)
        } else {
          res.status(httpStatus).json({
            errorMessage: errorMessage
          })
        }
      } catch (err) {
        res.status(400).json({
          errorMessage: errorMessage
        })
      }
    },

    findMaidByMaidId: async (req, res) => {
      
      try {
        let result = await service.findMaidByMaidId(req.params.maidId);
        const {
          httpStatus,
          message,
          errorMessage
        } = result
        if (!errorMessage) {
          res.status(httpStatus).json(message)
        } else {
          res.status(httpStatus).json({
            errorMessage: errorMessage
          })
        }
      } catch (err) {
        res.status(400).json({
          errorMessage: errorMessage
        })
      }
    },

  }
}