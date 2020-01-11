module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    content: {
      type:DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10
      }
    }
  });

  return review;
};
