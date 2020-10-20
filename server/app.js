const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const helmet = require("helmet");
const hpp = require("hpp");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
require("dotenv").config();

// Router
const testRouter = require("./routes/test");
const authRouter = require("./routes/auth");

const sequelize = require("./models").sequelize;
const passportConfig = require("./passport");
const logger = require("./logger");

const app = express();
sequelize.sync();
passportConfig(passport);

// const albumBucketName = "secubook-img-data";
// const bucketRegion = "ap-northeast-2";
// const IdentityPoolId = "ap-northeast-2:d6bfe72f-11c1-4ff5-ada3-8156f27c498f";

// AWS.config.update({
//   region: bucketRegion,
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IdentityPoolId,
//   }),
// });

// const s3 = new AWS.S3({
//   apiVersion: "2006-03-01",
//   params: { Bucket: albumBucketName },
// });
// https://medium.com/@hozacho/브라우저에서-바로-aws-s3에-파일-업로드하기-637dde104bcc 참고

// Views 폴더 및 pug 설정
app.set("views", path.join(__dirname, "views"));
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  logErrors: true,
}); // https://wookkk.tistory.com/entry/nodejs교과서-redis-부분-버전에-따른-에러 참고
client.auth(process.env.REDIS_PASSWORD); // https://github.com/silverbucket/node-redis-connection-pool/issues/14 참고
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new RedisStore({ client }),
};
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Router setting
app.use("/", testRouter);
app.use("/auth", authRouter);

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
