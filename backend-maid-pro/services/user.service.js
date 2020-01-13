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
          err ? console.error(err) : null;
          user = { ...user, password: hashedPassword };

          const result = await repository.signUp(user);

          resolve({ httpStatus: 200, message: result })
        })(req)
      });
    }

  }
};
