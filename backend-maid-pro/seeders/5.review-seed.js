const faker = require("faker");
const { numberOfUser } = require("../utils/index");

const reviewData = [];
for (let i = 1, id = 1; i <= numberOfUser; i += 2, id++) {
  for (let j = 2; j <= numberOfUser; j += 2) {

    let data = {
      id,
      content: faker.lorem.line(),
      rating: Math.floor(Math.random() * 5) + 1,
      employer_id: i,
      maid_id: j,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log(data);
    reviewData.push(data)
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', reviewData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', {}, {});
  }
};
