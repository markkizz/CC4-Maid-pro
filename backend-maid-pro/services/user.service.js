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
          if (!req.files) {
            return {}
          } else {
            if (err) reject(err);
            const image = req.files.profileImage;

            const fileName = (new Date()).getTime();
            const tempName = image.name.split(".");
            const fileFormat = tempName[tempName.length - 1];
            image.mv(`uploads/${fileName}.${fileFormat}`);

            user = { ...user, password: hashedPassword };
            try {
              const result = await repository.signUp(user);
              if (!result) {
                resolve({ httpStatus: 204, message: result });
              } else {
                resolve({ httpStatus: 200, message: result });
              }
              finalResult = result
            } catch (ex) {
              if (ex.message.includes('ECONNREFUSED')) {
                return { httpStatus: 500, errorMessage: 'Database server error' };
              }
              return { httpStatus: 400, errorMessage: ex };
            }
          }
        })(req)
      });
    },

    signIn: (req, res, next) => {
      const result = { httpStatus: 500, message: undefined, errorMessage: undefined };
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
            const token = jwt.sign(
              { id: user.id, type: user.type, first_name: user.first_name, last_name: user.last_name },
              jwtOptions.secretOrKey,
              { expiresIn: 3600 }
            );

            result.httpStatus = 200;
            result.message = {
              auth: true,
              token,
              message: 'user found & logged in'
            };
          }
          resolve(result);
        })(req, res, next)
      });
    },

    findMaids: async (type) => {
      try {
        const result = await repository.findMaids(type);

        let codecampResult = [];
        result.map(maid => {
          let reviewsList = [];
          for (let reviewer of maid.reviewed_maids) {
            reviewsList.push({
              rating: reviewer.review.rating
            });
          }
          codecampResult.push({
            maid_first_name: maid.first_name,
            maid_last_name: maid.last_name,
            reviewsList
          });
        });

        if (result.length === 0) {
          return { httpStatus: 204, message: result };
        } else {
          return { httpStatus: 200, message: codecampResult };
        }
      } catch (ex) {
        if (ex.message.includes('ECONNREFUSED')) {
          return { httpStatus: 500, errorMessage: 'Database server error' };
        }
        return { httpStatus: 400, errorMessage: ex.message };
      }
    }

  }
};
