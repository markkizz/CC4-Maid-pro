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
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 3,
        user_id: 7
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 3,
        user_id: 8
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 6,
        user_id: 8
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 3,
        user_id: 9
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        building_type_id: 4,
        user_id: 10
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('services', [{}]);
  }
};
