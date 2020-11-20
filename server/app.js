const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
require("dotenv").config();

// Router
const setupRouter = require("./routes/setup");
const mainRouter = require("./routes/main");
const authRouter = require("./routes/auth");
const levelRouter = require("./routes/level");
const learnRouter = require("./routes/learn");
const talkRouter = require("./routes/talk");
const problemRouter = require("./routes/problem");

const sequelize = require("./models").sequelize;
const passportConfig = require("./passport");
const logger = require("./logger");

const app = express();
sequelize.sync();
passportConfig(passport);

// Views 폴더 및 pug 설정
app.set("views", path.join(__dirname, "../front/build"));
app.set("view engine", "pug");
app.set("port", process.env.PORT || 8001);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../front/build")));
// app.use(express.static(path.join(__dirname, "../front/build/index.html")));
app.use("*", express.static(path.join(__dirname, "../front/build/index.html")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

app.use(
  cors({
    origin: true,
    credentials: true,
  })
); // https://velog.io/@bigbrothershin/Backend-다른-도메인-간에-쿠키-주고받기

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// https://kamang-it.tistory.com/entry/Web동일-출처-정책-CORS-도대체-뭘까

// Router setting
app.use("/", mainRouter);
app.use("/setup", setupRouter);
app.use("/auth", authRouter);
app.use("/level", levelRouter);
app.use("/learn", learnRouter);
app.use("/talk", talkRouter);
app.use("/problem", problemRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  logger.error(err.message);
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
