const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const passport = require('passport');

const userRouter = require('./routes/user.router');
const bookingRouter = require('./routes/booking.router')
const buildingTypeRouter = require('./routes/building-type.router')
const reviewRouter = require('./routes/review.router')

const PORT = 3333;

// import passport config
require('./config/passport/passport');

server.use(passport.initialize({}));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


db.sequelize.sync({ alter: true }).then(() => {
  userRouter(server, db);
  bookingRouter(server, db)
  buildingTypeRouter(server, db)
  reviewRouter(server, db)

  server.listen(PORT, () => console.log("Backend is started with port:", PORT));
});

// module.exports = server;
