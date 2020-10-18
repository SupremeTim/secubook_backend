module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "comment",
    {
      host: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
