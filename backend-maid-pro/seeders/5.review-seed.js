const faker = require('faker');
const { numOfUser } = require('../utils/index');

const reviewData = [];
for (let i = 2, id = 1; i <= numOfUser; i += 2, id++) {
  for (let j = 2; j <= numOfUser; i += 2) {

    let data = {
      // id,
      content: faker.lorem.line(),
      rating: Math.floor(Math.random() * 5) + 1,
      employer_id: i,
      maid_id: j,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('data', data);
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
