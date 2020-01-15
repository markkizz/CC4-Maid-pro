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
<<<<<<< HEAD
          console.log('errorMessage', errorMessage);
          res.status(httpStatus).json({
            errorMessage
          });
=======
          res.status(httpStatus).json({ errorMessage });
>>>>>>> 247a14abdee434e439b95e2c882368d91a1d3306
        }
      } catch (ex) {
        res.status(400).json({
          errorMessage: ex.message
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
<<<<<<< HEAD
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

    findDescriptionMaid: function (req, res) {
      return service.findDescriptionMaid(req.params.id);
    }

    
  }
}
=======
        const result = await service.findMaids(req.query.type);
        const { httpStatus, message, errorMessage } = result;

        if (!result.errorMessage) {
          res.status(httpStatus).json(message);
        } else {
          res.status(httpStatus).json({ errorMessage: errorMessage });
        }
      } catch (err) {
        res.status(400).json({ errorMessage: err.message });
      }
    }
  };
};
>>>>>>> 247a14abdee434e439b95e2c882368d91a1d3306
