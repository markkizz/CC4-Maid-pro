const CONDO_1_40 = 'คอนโด 1 ห้องนอน (ไม่เกิน 40 ตร.ม.)';
const CONDO_1_50 = 'คอนโด 1 ห้องนอน (ไม่เกิน 50 ตร.ม.)';
const CONDO_2_80 = 'คอนโด 2 ห้องนอน (ไม่เกิน 80 ตร.ม.)';
const CONDO_3_100 = 'คอนโด 3 ห้องนอน (ไม่เกิน 100 ตร.ม.)';
const HOUSE_1_100 = 'บ้าน 1 ชั้น (ไม่เกิน 100 ตร.ม.)';
const HOUSE_23_200 = 'บ้าน 2-3 ชั้น (100-200 ตร.ม.)';
const HOUSE_201plus = 'บ้าน 200 ตร.ม. ขึ้นไป';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('building_types',
    [
      {
        id: 1,
        type: CONDO_1_40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        type: CONDO_1_50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        type: CONDO_2_80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        type: CONDO_3_100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        type: HOUSE_1_100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        type: HOUSE_23_200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        type: HOUSE_201plus,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('building_types', [{}]);
  }
};
