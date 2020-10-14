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
    }
  );
