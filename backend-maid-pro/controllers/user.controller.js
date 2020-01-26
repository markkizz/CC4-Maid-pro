const userService = require("../services/user.service");

module.exports = db => {
  const service = userService(db);

  return {
    signUp: async (req, res) => {
      try {
        const result = await service.signUp(req, req.body);
        const { httpStatus, message, errorMessage } = result;
        if (!errorMessage) {
          res.status(httpStatus).json(message);
        } else {
          res.status(httpStatus).json({ errorMessage });
        }
      } catch (ex) {
        res.status(400).json({ errorMessage: ex.message });
      }
    },

    signIn: async (req, res, next) => {
      const { httpStatus, message, errorMessage } = await service.signIn(req, res, next);
      try {
        if (!errorMessage) {
          res.status(httpStatus).json(message);
        } else {
          res.status(httpStatus).json({ errorMessage });
        }
      } catch (ex) {
        res.status(400).json({ errorMessage: ex.message });
      }
    },

    findMaidsWithMaybeLimitOrderByAverageRatingDesc: async (req, res) => {
      try {
        const result = await service.findMaidsWithMaybeLimitOrderByAverageRatingDesc(req.query.limit);
        const { httpStatus, message, errorMessage } = result;
        if (!errorMessage) {
          res.status(httpStatus).json(message);
        } else {
          res.status(httpStatus).json({ errorMessage: errorMessage });
        }
      } catch (err) {
        res.status(400).json({ errorMessage: err.message });
      }
    },

    findMaidByMaidId: async (req, res) => {
      try {
        let result = await service.findMaidByMaidId(req.params.maidId);
        const { httpStatus, message, errorMessage } = result;
        if (!errorMessage) {
          res.status(httpStatus).json(message);
        } else {
          res.status(httpStatus).json({ errorMessage: errorMessage });
        }
      } catch (err) {
        console.log(err)
        res.status(400).json({ errorMessage: err.message });
      }
    },
    // ? available time and total rating of maid not in database
    // * argument can refactor
    searchMaids: async (req, res) => {
      try {
        console.log(req.body)
        const { name, work_date, rating, price_hour } = req.query;
        const arr_price_hour = price_hour.split(",").map(price => Number(price));
        let type_id = Number(req.query.type_id);
        let result = await service.searchMaids(name, type_id, work_date, rating, arr_price_hour);
        const { httpStatus, message, errorMessage } = result;
        if (!errorMessage) {
          res.status(httpStatus).json(message);
        } else {
          res.status(httpStatus).json({ errorMessage: errorMessage });
        }
      } catch (err) {
        console.log('err', err);
        res.status(400).json({ errorMessage: err.message });
      }
    },

    getMyBooking: async (req, res) => {
      try {
        const result = await service.getMyBooking(req.user.id, req.user.type);
        const { httpStatus, message, errorMessage } = result;
        if (!errorMessage) {
          res.status(httpStatus).json(message);
        } else {
          res.status(httpStatus).json({ errorMessage: errorMessage });
        }
      } catch (err) {
        console.error(err);
        res.status(400).json({ errorMessage: err.message });
      }
    },

    findMaidsByBuildingType: async (req, res) => {
      try {
        const { buildingType } = req.query;
        const result = await service.findMaidsByBuildingType(buildingType);
        const { httpStatus, message, errorMessage } = result;
        if (!errorMessage) {
          res.status(httpStatus).json(message);
        } else {
          res.status(httpStatus).json({ errorMessage: errorMessage });
        }
      } catch (err) {
        console.error(err);
        res.status(400).json({ errorMessage: err.message });
      }
    }
  };
};
