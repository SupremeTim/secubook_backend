module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "codingTest",
    {
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cntOfSolve: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      cntOfRun: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      timeAverage: {
        type: DataTypes.INTEGER,
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
