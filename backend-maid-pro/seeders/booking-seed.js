const faker = require("faker");
const { numberOfUser } = require("./constant/constant");

const status = [
  "WAIT_FOR_ACCEPTANCE",
  "ACCEPT",
  "REJECT",
  "CANCEL",
  "FINISHED"
];

const genId = (OddOrEven, id) => {
  const ifCondition = x => {
    if (OddOrEven === "odd") {
      return x % 2 === 0;
    } else {
      return x % 2 !== 0;
    }
  };
  let newId = id;
  while (ifCondition(newId)) {
    newId = Math.floor(Math.random() * numberOfUser);
  }
  return newId;
};
const bookingData = [];

for (let i = 1; i <= numberOfUser; i++) {
  const booking = {
    work_at: new Date(),
    work_hour: 2,
    status: status[Math.floor(Math.random() * 5)],
    pay_slip_image: faker.image.cats(),
    employer_id: 1,
    maid_id: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  bookingData.push(booking);
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("bookings", bookingData, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("bookings", [{}]);
  }
};
