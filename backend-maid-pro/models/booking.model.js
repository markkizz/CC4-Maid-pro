module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define('booking', {
    work_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    work_hour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type:DataTypes.ENUM('IN-PROGRESS','APPROVE','CANCEL'),
      allowNull: false
    },
    pay_slip_image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return booking;
};
