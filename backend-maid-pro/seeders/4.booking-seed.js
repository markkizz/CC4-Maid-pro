const faker = require("faker");
const { numberOfUser } = require("./cons/constant");

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
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("bookings",
    [
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 1,
        maid_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 1,
        maid_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 3,
        maid_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 5,
        maid_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 7,
        maid_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 5,
        maid_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 9,
        maid_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 7,
        maid_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 1,
        maid_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 9,
        maid_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        work_at: genDateWork(),
        work_hour: 2,
        status: status[Math.floor(Math.random() * 5)],
        pay_slip_image: 'url',
        employer_id: 7,
        maid_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("bookings", [{}]);
  }
};

