module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "timeInfo",
    {
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
