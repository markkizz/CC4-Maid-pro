const faker = require("faker");
const { numberOfUser } = require("../utils/index");

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
    newId = Math.floor(Math.random() * 10);
  }
  return newId;
};

const genDateWork = () => {
  const someDate = new Date();
  const numberOfDaysToAdd = Math.floor(Math.random() * 31);
  const gen = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  const newDate = new Date(gen)
  const dd = newDate.getDate();
  const mm = newDate.getMonth() + 1;
  const y = newDate.getFullYear();
  const h = someDate.getHours();
  const m = someDate.getMinutes();
  const s = someDate.getSeconds();
  return `${y}-${mm}-${dd} ${h}:${m}:${s}`
};


const bookingData = [];
for (let i = 1; i <= numberOfUser; i++) {
  const booking = {
    id: i,
    work_at: genDateWork(),
    work_hour: 2,
    status: 'WAIT_FOR_ACCEPTANCE',
    pay_slip_image: 'url',
    employer_id: genId('odd', i),
    maid_id: genId('even', i),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  bookingData.push(booking);
}

const genAddress = () => `${faker.address.city()} ${faker.address.state(
  true
)} ${faker.address.streetAddress(true)} ${faker.address.streetName()}`


module.exports = {
  up: (queryInterface, Sequelize) => {
    let stat;
    const genstatus = () => {
      stat = status[Math.floor(Math.random() * 5)]
      return stat
    };
    const checkIfReject = status => status === 'REJECT' ? 'uvuvwevwevwe onyetenyevwe ugwemubwem ossas' : null
    return queryInterface.bulkInsert("bookings",
    [
      {
        id: 1,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 1,
        maid_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      },
      {
        id: 2,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 1,
        maid_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      },
      {
        id: 3,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 3,
        maid_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      },
      {
        id: 4,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 5,
        maid_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      },
      {
        id: 5,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 7,
        maid_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      },
      {
        id: 6,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 5,
        maid_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      },
      {
        id: 7,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 9,
        maid_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      },
      {
        id: 8,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 7,
        maid_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      },
      {
        id: 9,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 1,
        maid_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      },
      {
        id: 10,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 9,
        maid_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      },
      {
        id: 11,
        customer_location: genAddress(),
        work_date: genDateWork(),
        work_hour: 2,
        status: genstatus(),
        pay_slip_image: 'url',
        employer_id: 7,
        maid_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        reject_note: checkIfReject(stat)
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("bookings", [{}]);
  }
};

