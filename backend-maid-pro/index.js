const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const passport = require('passport');

const PORT = 3333;

server.use(passport.initialize({}));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// import passport config
// require('./config/passport/passport');

server.get('/', (req, res) => res.send({hello: 'world'}))

db.sequelize.sync({ alter: false, force: true }).then(() => {
  server.listen(PORT, () => console.log("Backend is started with port:", PORT));
});

// module.exports = server;
