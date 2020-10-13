module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "board",
    {
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
