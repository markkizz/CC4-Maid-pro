const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/passport/passport');

const userRepository = require('../repositories/user.repository');

module.exports = (db) => {
  const repository = userRepository(db);

  return {

    signUp: (req, user) => {
      return new Promise((resolve, reject) => {
        passport.authenticate('local-hashPassword', {}, async (err, hashedPassword) => {

          if (err) reject(err);

          user = { ...user, password: hashedPassword };
          try {
            const result = await repository.signUp(user);
            if (!result) {
              resolve({ httpStatus: 204, message: result });
            } else {
              resolve({ httpStatus: 200, message: result });
            }
          } catch (ex) {
            if (ex.message.includes('ECONNREFUSED')) {
              return { httpStatus: 500, errorMessage: 'Database server error' };
            }
            return { httpStatus: 400, errorMessage: ex };
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
    }

  }
};
