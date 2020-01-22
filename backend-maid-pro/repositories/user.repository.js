const Sequelize = require("sequelize");
const { Op } = require("sequelize");
module.exports = db => {
  return {
    signUp: user => {
      const { username, password, email, type } = user;
      return db.user.create({ username, password, type, email, status: "ACTIVE" });
    },

    findUserByUsername: username => {
      return db.user.findOne({ where: { username } });
    },

    findMaidsWithMaybeLimitOrderByAverageRatingDesc: limit => {
      return db.user.findAll({
        where: { type: "MAID" },
        limit,
        attributes: {
          exclude: ['password']
        },
        order: [['average_rating', 'DESC']],
      })
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
      if (type === "MAID") {
        return db.booking.findAll({
          where: { maid_id: user_id }
        })
      } else {
        return db.booking.findAll({
          where: { employer_id: user_id }
        })
      }
    },

    findMaidByMaidId: (maidId) => {
      return db.user.findOne({
        attributes: ['id', 'first_name', 'last_name', 'type', 'phone_no', 'email',
          'profile_img', 'address', 'status', 'bank_account_no', 'bank_name', 'price_per_hour', 'holidays', 'about_maid',
        ],
        where: { id: maidId, type: 'maid' },
        include: [{
          model: db.user,
          as: 'reviewed_maids',
          through: {
            attributes: ['rating', 'content']
          },
        }],
      });
    },

    findMaidsQuickSearch: async (serviceTypeId) => {
      return db.user.findAll({
        where: { type: 'MAID' },
        attributes: {
          exclude: ["password"]
        },
        include: [
          {
            as: "served_building_types",
            model: db.building_type,
            where: {
              id: {
                [Op.between]: serviceTypeId
              }
            }
          }
        ]
      })
    }
  }
};
