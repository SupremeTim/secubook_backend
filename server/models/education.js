const { all } = require("../routes/test");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "education",
    {
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      page: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
