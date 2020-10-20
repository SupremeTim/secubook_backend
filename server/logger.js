const winston = require("winston");
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = winston.format;

const moment = require("moment");

function myTimeStamp() {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}
// https://namocom.tistory.com/312 [나모의 노트]

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
  level: "silly",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new transports.File({
      filename: "combined.log",
      timestamp: myTimeStamp,
    }),
    new transports.File({
      filename: "error.log",
      level: "error",
      timestamp: myTimeStamp,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 색깔 넣어서 출력
        winston.format.simple()
      ),
      timestamp: myTimeStamp,
    })
  );
}

module.exports = logger;

// https://velog.io/@ash/Node.js-서버에-logging-라이브러리-winston-적용하기 참고
