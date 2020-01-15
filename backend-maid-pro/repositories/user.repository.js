module.exports = (db) => {
  return {

    signUp: (user) => {
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
        status: 'ACTIVE'
      })
    },

    findUserByUsername: (username) => {
      return db.user.findOne({
        where: {
          username
        }
      });
    },

    findMaids: (type) => {
      return db.user.findAll({
        where: {
          type: type
        }
      });
    },

    findDescriptionMaid: function (id) {
      return db.user.findOne({
        attributes: ['id', 'first_name', 'last_name', 'type', 'phone_no', 'email',
          'profile_img', 'address', 'status', 'bank_account_no', 'bank_name', 'price_per_hour', 'holidays', 'about_maid',
        ],
        where: {
          id: id
        },
        include: [{
          model: db.user,
          through: {
            attributes: [
              ['rating', 'จนคะแนน'],
              ['content', 'คอมเม้นต์']
            ]
          }
        }],
      })
    }
  }
}