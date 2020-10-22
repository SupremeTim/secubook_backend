module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      studyList: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      codingList: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      dockerPort: {
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
