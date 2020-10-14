module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "drill",
    {
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      level: {
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
      answer: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
