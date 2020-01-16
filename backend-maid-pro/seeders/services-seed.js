module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('services',
    [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 1,
        user_id: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 2,
        user_id: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 5,
        user_id: 4
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 6,
        user_id: 4
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 7,
        user_id: 4
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 3,
        user_id: 6
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('services', [{}]);
  }
};
