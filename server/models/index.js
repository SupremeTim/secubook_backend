const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Board = require("./board")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.CodingTest = require("./codingTest")(sequelize, Sequelize);
db.TimeInfo = require("./timeInfo")(sequelize, Sequelize);
db.Education = require("./education")(sequelize, Sequelize);
db.Drill = require("./drill")(sequelize, Sequelize);

db.User.hasMany(db.Board);
db.Board.belongsTo(db.User);
db.Board.hasMany(db.Comment);
db.Comment.belongsTo(db.Board);
db.User.hasMany(db.TimeInfo);
db.TimeInfo.belongsTo(db.User);
db.CodingTest.hasMany(db.TimeInfo);
db.TimeInfo.belongsTo(db.CodingTest);

module.exports = db;
