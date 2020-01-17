const Sequelize = require("sequelize");
const { Op } = require("sequelize");
module.exports = db => {
  return {
    signUp: user => {
      const {
        username,
        password,
        firstName,
        lastName,
        email,
        type,
        phoneNo,
        profileImage,
        bankAccountNo,
        bankName,
        idCardNo,
        address,
        holidays = null,
        aboutMaid = null,
        pricePerHour = null
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
        status: "ACTIVE"
      });
    },

    findUserByUsername: username => {
      return db.user.findOne({ where: { username } });
    },

    findMaids: type => {
      return db.user.findAll({
        where: { type: type },
        include: [
          {
            model: db.user,
            as: "reviewed_maids",
            through: { attributes: ["rating"] }
          }
        ]
      });
    },
    searchMaidsAllChoice: (name, type_id, date, time, rating, price_hour) => {
      return db.user.findAll({
        where: {
          type: "MAID",
          [Op.or]: {
            first_name: {
              [Op.like]: `%${name}%`
            },
            last_name: {
              [Op.like]: `%${name}%`
            }
          },
          holidays: {
            [Op.notIn]: [date]
          },
          price_per_hour: {
            [Op.between]: [price_hour[0], price_hour[1]]
          }
        },
        attributes: {
          exclude: ["password"]
        },
        include: [
          {
            as: "served_building_types",
            model: db.building_type,
            where: {
              id: type_id
            }
          }
        ]
      });
    },
    searchMaids: (name, type_id, date, time, rating, price_hour) => {
      return db.user.findAll({
        where: {
          type: "MAID",
          price_per_hour: {
            [Op.between]: [price_hour[0], price_hour[1]]
          },
          holidays: {
            [Op.notIn]: [date]
          }
        },
        attributes: {
          exclude: ["password"]
        },
        include: [
          {
            as: "served_building_types",
            model: db.building_type,
            where: {
              id: type_id
            }
          }
        ]
      });
    },
    getMyBooking: (user_id, type) => {
      if (type == "MAID") {
        return db.booking.findAll({
          where: { maid_id: user_id }
        })
      } else {
        return db.booking.findAll({
          where: { employer_id: user_id }
        })
      }
    }
  };
};
