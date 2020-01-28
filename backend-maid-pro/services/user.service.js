const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/passport/passport');
const userRepository = require('../repositories/user.repository');

module.exports = (db) => {
  const repository = userRepository(db);

  return {

    signUp: (req, user) => {
      let finalResult;
      return new Promise((resolve, reject) => {
        passport.authenticate('local-hashPassword', {}, async (err, hashedPassword) => {
          // if (!req.files) {
          //   return {}
          // } else {
          //   if (err) reject(err);
          //   const image = req.files.profileImage;
          //
          //   const fileName = (new Date()).getTime();
          //   const tempName = image.name.split(".");
          //   const fileFormat = tempName[tempName.length - 1];
          //   image.mv(`uploads/${fileName}.${fileFormat}`);
          user = { ...user, password: hashedPassword };
          try {
            const result = await repository.signUp(user);
            if (!result) {
              resolve({ httpStatus: 422, message: result });
            } else {
              resolve({ httpStatus: 201, message: result });
            }
          } catch (ex) {
            if (ex.errors[0].message.includes('ECONNREFUSED')) {
              resolve({ httpStatus: 500, errorMessage: 'Database server error' });
            } else if (ex.errors[0].message.includes('username must be unique')) {
              resolve({ httpStatus: 400, errorMessage: 'Username has already taken' });
            }
            resolve({ httpStatus: 400, errorMessage: ex.errors[0].message });
          }
          // }
        })(req);
      });
    },

    signIn: (req, res, next) => {
      const result = {
        httpStatus: 500,
        message: undefined,
        errorMessage: undefined
      };
      return new Promise((resolve, reject) => {
        passport.authenticate('local-comparePassword', {}, (err, user, info) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          if (info !== undefined) {
            console.error(`Info Message Error: ${info.message}`);
            if (info.message === 'Database server error') {
              result.httpStatus = 500;
              result.message = info.message;
            } else if (!user) {
              result.httpStatus = 401;
              result.message = info.message;
            } else {
              result.httpStatus = 400;
              result.errorMessage = info.message;
            }
            console.log(info.message);
          } else {
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                type: user.type,
                first_name: user.first_name,
                last_name: user.last_name,
                address: user.address,
                profile_img: user.profile_img
              },
              jwtOptions.secretOrKey, {
                expiresIn: 3600
              }
            );

            result.httpStatus = 200;
            result.message = {
              auth: true,
              token,
              message: 'user found & logged in'
            };
          }
          resolve(result);
        })(req, res, next);
      });
    },

    findMaidByMaidId: async (maidId) => {
      try {
        let result = await repository.findMaidByMaidId(maidId);

        if (!result) {
          return { httpStatus: 204, message: result };
        } else {

          let sum = 0;
          for (let review of result.reviewed_maids) {
            sum += parseFloat(review.review.rating);
          }
          const average = sum / (result.reviewed_maids.length || 1);

          result = {
            id: result.id,
            firstName: result.first_name,
            lastName: result.last_name,
            type: result.type,
            phoneNo: result.phone_no,
            profileImg: result.profile_img,
            pricePerHour: result.price_per_hour,
            holidays: result.holidays,
            aboutMaid: result.about_maid,
            averageRating: average,
            buildingServices: result.served_building_types,
            reviewedMaids: result.reviewed_maids
          };

          return { httpStatus: 200, message: result };
        }
      } catch (ex) {
        if (ex.message.includes('ECONNREFUSED')) {
          return { httpStatus: 500, errorMessage: 'Database server error' };
        }
        return { httpStatus: 400, errorMessage: ex.message };
      }
    },

    searchMaids: async (name, type_id, date, rating, price_hour) => {
      try {
        let result = await repository.searchMaidsAllChoice(name, type_id, date, rating, price_hour);
        if (result.length === 0) {
          result = await repository.searchMaids(name, type_id, date, rating, price_hour);
          if (result.length === 0) {
            return { httpStatus: 204, message: result };
          } else {
            return { httpStatus: 200, message: result };
          }
        }
      } catch (err) {
        if (err.message.includes('ECONNREFUSED')) {
          return { httpStatus: 500, errorMessage: 'Database server error' };
        }
        return { httpStatus: 400, errorMessage: err.message };
      }
    },

    getMyBooking: async (id, type) => {
      try {
        const result = await repository.getMyBooking(id, type);
        if (result.length === 0) {
          return { httpStatus: 204, message: result };
        } else {
          return { httpStatus: 200, message: result };
        }
      } catch (err) {
        if (err.message.includes('ECONNREFUSED')) {
          return { httpStatus: 500, errorMessage: 'Database server error' };
        }
        return { httpStatus: 400, errorMessage: err.message };
      }
    },

    findMaidsWithMaybeLimitOrderByAverageRatingDesc: async (limit) => {
      try {
        let result = await repository.findMaidsWithMaybeLimitOrderByAverageRatingDesc(parseInt(limit));
        result = result[0]
        if (result.length === 0) {
          return { httpStatus: 204, message: result };
        } else {
          return { httpStatus: 200, message: result };
        }
      } catch (err) {
        console.error(err);
        if (err.message.includes('ECONNREFUSED')) {
          return { httpStatus: 500, errorMessage: 'Database server error' };
        }
        return { httpStatus: 400, errorMessage: err.message };
      }
    },

    findMaidsByBuildingType: async (buildingType) => {
      try {
        let buildingTypeIds;
        if (buildingType === 'condo') buildingTypeIds = [1, 4];
        else if (buildingType === 'home') buildingTypeIds = [5, 7];
        else return { httpStatus: 400, errorMessage: 'invalid service type' };
        const result = await repository.findMaidsByBuildingTypeIds(buildingTypeIds);
        if (result.length === 0) {
          return { httpStatus: 204, message: result };
        } else {
          return { httpStatus: 200, message: result };
        }
      } catch (err) {
        console.error(err);
        if (err.message.includes('ECONNREFUSED')) {
          return { httpStatus: 500, errorMessage: 'Database server error' };
        }
        return { httpStatus: 400, errorMessage: err.message };
      }
    }
  }
};

