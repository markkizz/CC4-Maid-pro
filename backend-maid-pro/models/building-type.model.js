const CONDO_1_40 = 'คอนโด 1 ห้องนอน (ไม่เกิน 40 ตร.ม.)';
const CONDO_1_50 = 'คอนโด 1 ห้องนอน (ไม่เกิน 50 ตร.ม.)';
const CONDO_2_80 = 'คอนโด 2 ห้องนอน (ไม่เกิน 80 ตร.ม.)';
const CONDO_3_100 = 'คอนโด 3 ห้องนอน (ไม่เกิน 100 ตร.ม.)';
const HOUSE_1_100 = 'บ้าน 1 ชั้น (ไม่เกิน 100 ตร.ม.)';
const HOUSE_23_200 = 'บ้าน 2-3 ชั้น (100-200 ตร.ม.)';
const HOUSE_201plus = 'บ้าน 200 ตร.ม. ขึ้นไป';

module.exports = (sequelize, DataTypes) => {
  const buildingType = sequelize.define('building_type', {
    type: {
      type: DataTypes.ENUM(
        CONDO_1_40,
        CONDO_1_50,
        CONDO_2_80,
        CONDO_3_100,
        HOUSE_1_100,
        HOUSE_23_200,
        HOUSE_201plus
      )
    }
  });

  buildingType.associate = (models) => {
    buildingType.belongsToMany(models.user, { as: 'served_maids', through: 'services', foreignKey: 'building_type_id' })
  };

  return buildingType
};
