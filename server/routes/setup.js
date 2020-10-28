const express = require("express");
const { Education, Drill } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    Education.create({
      title: "SQL-Injection",
      category: 0,
      page: 0,
      content: "test",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    Education.create({
      title: "SQL-Injection",
      category: 0,
      page: 1,
      content: "test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    Education.create({
      title: "SQL-Injection",
      category: 0,
      page: 2,
      content: "test입니다.&&test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg&&https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    res.send({ testMessage: "더미데이터 추가 완료" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/add", async (req, res, next) => {
  try {
    Drill.create({
      title: "SQL-Injection",
      type: 0,
      level: 0,
      content: "test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
      answer: "정답입니다",
    });

    res.send({ testMessage: "더미데이터 추가 완료" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
