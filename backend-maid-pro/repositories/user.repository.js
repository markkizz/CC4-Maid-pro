const Sequelize = require('sequelize');
const { Op } = require('sequelize');
module.exports = (db) => {
  return {

    signUp: (user) => {
      const {
        username, password, firstName, lastName, email, type, phoneNo, profileImage, bankAccountNo,
        bankName, idCardNo, address, holidays = null, aboutMaid = null, pricePerHour = null
      } = user;

      return db.user.create({
        username: username,
        password,
        first_name: firstName,
        last_name: lastName,
        type,
        address,
        phone_no: phoneNo,
        profile_image: profileImage,
        bank_account_no: bankAccountNo,
        bank_name: bankName,
        id_card_no: idCardNo,
        holidays,
        email,
        about_maid: aboutMaid,
        price_per_hour: pricePerHour,
        status: 'ACTIVE'
      })
    },

    findUserByUsername: (username) => {
      return db.user.findOne({ where: { username } });
    },

    findMaids: (type) => {
      return db.user.findAll({
        where: { type: type }
      });
    },
    searchMaids: (first_name, type) => {
      return db.user.findAll({
        where: {
          type: 'MAID',
          first_name: {
            [Op.like]: `%${first_name}%`
          },
        },
        include: [
          {
            as: 'served_building_types',
            model: db.building_type,
            where: {
                  type: type
            }
          }
        ]
      });
    }

  }
}