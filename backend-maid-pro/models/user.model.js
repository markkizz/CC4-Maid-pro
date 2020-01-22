const EMPLOYER = 'EMPLOYER';
const MAID = 'MAID';

const ACTIVE = 'ACTIVE';
const BANNED = 'BANNED';

module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: ["^[a-z0-9]+$", 'i'],
      }
    },

    password: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        // len: 20
      }
    },
    id_card_no: {
      type: DataTypes.STRING(60),
      // allowNull: false,
      validate: {
        // is: ['^\d{13}$']
        isInt: true,
        len: [13, 13]
      }
    },
    first_name: {
      type: DataTypes.STRING(60),
      // allowNull: false,
      validate: {
        is: ['^[a-zA-Z-]+$', 'i'],
      }
    },
    last_name: {
      type: DataTypes.STRING(60),
      // allowNull: false,
      validate: {
        is: ['^[a-zA-Z-]+$', 'i'],
      }
    },
    type: {
      type: DataTypes.ENUM(EMPLOYER, MAID),
      allowNull: false,
      validate: {
        isIn: [[EMPLOYER, MAID]] //ADMIN is only change type in DBMS
      }
    },
    phone_no: {
      type: DataTypes.STRING(10),
      // allowNull: false,
      validate: {
        isInt: true,
        len: [10, 10]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    profile_img: {
      type: DataTypes.STRING(500)
    },
    address: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM(ACTIVE, BANNED),
      allowNull: false
    },
    bank_account_no: {
      type: DataTypes.STRING(10),
      validate: {
        isInt: true,
        len: [10, 10]
      }
    },
    bank_name: {
      type: DataTypes.STRING
    },
    price_per_hour: {
      type: DataTypes.INTEGER
    },
    holidays: {
      type: DataTypes.STRING
    },
    about_maid: {
      type: DataTypes.STRING(1500)
    },
    average_rating: {
      type: DataTypes.FLOAT
    }
  }, {

    getterMethods: {
      full_name() {
        return `${this.first_name} ${this.last_name}`
      }
    },

    setterMethods: {
      full_name(value) {
        if (value !== undefined || value !== null) {
          const names = value.split(' ');
          this.setDataValue('first_name', names.slice(0, -1).join(' ')); // names[0]
          this.setDataValue('last_name', names.slice(-1).join(' '));     // names[1]
        }
      }
    }
  });

  user.associate = (models) => {
    user.belongsToMany(models.building_type, {
      as: 'served_building_types',
      onDelete: 'CASCADE',
      through: 'services',
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    });

    user.belongsToMany(models.user, {
      as: 'maid_bookings',
      through: models.booking,
      foreignKey: {
        name: 'employer_id',
        allowNull: false
      },
      otherKey: 'maid_id'
    });

    user.belongsToMany(models.user, {
      as: 'reviewed_employers',
      through: {
        model: models.review,
        unique: false,
      },
      foreignKey: {
        name: 'employer_id',
      },
    });

    user.belongsToMany(models.user, {
      as: 'reviewed_maids',
      through: {
        model: models.review,
        unique: false,
      },
      foreignKey: {
        name: 'maid_id',
      },
    });
  };

  return user;
};
