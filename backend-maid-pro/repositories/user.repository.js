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

    searchMaidsAllChoice: (name = null, type_id = null, date = null, rating = 0, price_hour = null) => {
      name = name ? `"${name}"` : null;
      date = date ? `"${date}"` : null;
      price_hour ? `"${price_hour}"` : null;
      return db.sequelize.query(
        `SELECT u.id, u.first_name, u.last_name, u.id_card_no, u.type as role, u.email, u.profile_img, u.address,
        u.bank_account_no, u.bank_name, u.price_per_hour, u.holidays, u.about_maid, u.average_rating, b.type as building_type
            FROM users u
            INNER JOIN services s
            ON s.user_id = u.id
            INNER JOIN building_types b
            ON s.building_type_id = b.id
            WHERE u.type = 'MAID'
            AND ((first_name LIKE CONCAT('%', ${name}, '%') OR ${name} IS NULL)
              OR (last_name LIKE CONCAT('%', ${name}, '%') OR ${name} IS NULL))
            AND (b.id = ${type_id} OR ${type_id} IS NULL)
            AND ((price_per_hour BETWEEN ${price_hour[0]} AND ${price_hour[1]}) OR ${price_hour[0]} IS NULL OR ${price_hour[1]} IS NULL)
            AND (holidays <> ${date} OR ${date} IS NULL)
            AND (average_rating = ${rating} OR ${rating} = 0)`,
        {
          // replacements: {
          //   name, typeId: type_id, holidays: date, rating,
          //   minPrice: price_hour[0], maxPrice: price_hour[1]
          // },
          // model: db.user,
          // mapToModel: true,
          type: db.sequelize.QueryTypes.SELECT
        }
      );
    },

    findMaidsWithMaybeLimitOrderByAverageRatingDesc: limit => {
      return db.sequelize.query(
        `SELECT u1.id, u1.username, u1.first_name, u1.last_name, u1.type, u1.phone_no, u1.email, u1.profile_img, 
        u1.address, u1.status, u1.price_per_hour, u1.average_rating, u1.about_maid, count(*) as number_of_reviews 
        FROM users u1 
        JOIN reviews rv 
        ON u1.id = rv.maid_id 
        JOIN users u2 
        ON u2.id = rv.employer_id 
        GROUP BY u1.id 
        ORDER BY u1.average_rating DESC LIMIT ${limit};`
      );
      // return db.user.findAll({
      //   where: { type: "MAID" },
      //   limit,
      //   attributes: {
      //     exclude: ['password']
      //   },
      //   order: [['average_rating', 'DESC']],
      // })
    },

    searchMaids: (name, type_id, date, rating, price_hour) => {
      return db.user.findAll({
        where: {
          type: "MAID",
          price_per_hour: {
            [Op.between]: [price_hour[0], price_hour[1]]
          },
          holidays: {
            [Op.notIn]: [date]
          },
          average_rating: rating
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
          'profile_img', 'address', 'status', 'bank_account_no', 'bank_name', 'price_per_hour', 'holidays', 'about_maid'
        ],
        where: { id: maidId, type: 'maid' },
        include: [
          {
            model: db.user,
            as: 'reviewed_maids',
            through: {
              attributes: ['rating', 'content']
            },
          },
          {
            model: db.building_type,
            as: 'served_building_types',
            attributes: {
              include: ['type']
            }
          }
        ],
      });
    },

    findMaidsByBuildingTypeIds: async (buildingTypeIds) => {
      return db.user.findAll({
        where: { type: 'MAID' },
        attributes: {
          exclude: ["password"]
        },
        order: [['average_rating', 'DESC']],
        include: [{
          as: "served_building_types",
          model: db.building_type,
          attributes: ['type'],
          where: {
            id: { [Op.between]: buildingTypeIds }
          }
        }]
      })
    }

  }
};
