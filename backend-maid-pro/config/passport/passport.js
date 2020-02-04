const env = process.env.NODE_ENV || 'development';
const config = require('../config.json')[env];

const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = config.salt_length;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../../models');
const userRepository = require('../../repositories/user.repository');

let jwtOptions = {};
jwtOptions.secretOrKey = 'c0d3c4m4';

passport.use('local-hashPassword', new LocalStrategy({ session: false }, (username, password, done) => {
  const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return done(null, hashedPassword);
}));

// @TODO: Passport.use('login')
passport.use('local-comparePassword', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false
  },
  async (username, password, done) => {
    try {
      const user = await userRepository(db).findUserByUsername(username);
      if (user === null) return done(null, false, { message: 'Username or Password is incorrect' });
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) {
          console.error(err);
          done(err);
        }
        if (!response) {
          return done(null, false, { message: 'Username or Password is incorrect' });
        }
        console.log(`user ${user.id} is found  & authenticated`);
        return done(null, user);
      });
    } catch (ex) {
      return done(null, false, { message: 'Database server error' });
    }

  }
));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtOptions.secretOrKey
};

passport.use('jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
  console.info(jwt_payload);
  const user = await db.user.findOne({ where: { id: jwt_payload.id } });
  if (user) {
    console.info('User found');
    done(null, user);
  } else {
    console.info('User not found');
    done(null, false);
  }
}));

module.exports = jwtOptions;

