const bcrypt = require("bcryptjs");
const faker = require("faker");

const env = process.env.NODE_ENV || 'development'
const config = require("../config/config.json")[env];

const BCRYPT_SALT_ROUNDS = config.salt_length;
const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);

const hashedPassword = password => bcrypt.hashSync(password, salt);

const genBankName = () => {
  const bankName = ["Bangkok Bank", "Kasikorn Bank", "Siam Commercial Bank"];
  const randomNumber = Math.floor(Math.random() * 3);
  return bankName[randomNumber];
};

const genUserType = () => {
  const userType = ["EMPLOYER", "MAID"];
  return userType[Math.floor(Math.random() * 2)];
};

let userData = [];

for (let i = 0; i < 10; i++) {
  let user = {
    id: i,
    username: i === 0 ? "test" : faker.internet.userName(),
    password: hashedPassword("1234"),
    id_card_no: '1234567890123',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    type: genUserType(),
    phone_no: faker.phone.phoneNumber('08#######'),
    email: faker.internet.email(),
    profile_img: faker.internet.avatar(),
    address: "Phetchaburi Rd, Thanon Phaya Thai, Ratchathewi ",
    status: "ACTIVE",
    bank_account_no: faker.finance.account(),
    bank_name: genBankName(),
    price_per_hour: Math.floor(Math.random() * 1000) + 200,
    about_maid: faker.lorem.paragraph(1),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  userData.push(user);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", userData, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", [{}]);
  }
};
