const express = require("express");
const {
  User,
  Education,
  Drill,
  Board,
  Comment,
  CodingTest,
} = require("../models");

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

    Drill.create({
      title: "SQL-Injection",
      type: 0,
      level: 0,
      content: "test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
      answer: "정답입니다",
    });

    User.create({
      name: "조인택",
      email: "dlsxor21c@naver.com",
      password: "",
      level: 0,
      dockerPort: 80,
    });

    Board.create({
      title: "궁금해요!4444",
      content: "test입니다.44",
      userId: 1,
    });

    Board.create({
      title: "궁금해요555",
      content: "test입니다.5555",
      userId: 1,
    });

    Comment.create({
      host: "dlsxor21c@naver.com",
      content: "test입니다.5555",
      boardId: 1,
    });

    Comment.create({
      host: "dlsxor21c@naver.com",
      content: "test입니다.5555",
      boardId: 1,
    });

    CodingTest.create({
      title: "코테문제이름",
      content: "코테푸세요",
      category: 0,
      level: 1,
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    CodingTest.create({
      title: "코테문제이름2",
      content: "코테푸세요2",
      category: 0,
      level: 2,
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    CodingTest.create({
      title: "코테문제이름3",
      content: "코테푸세요3",
      category: 1,
      level: 1,
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });
    res.send({ testMessage: "더미데이터 추가 완료" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/add", async (req, res, next) => {
  try {
    // Education.create({
    //   title: "SQL-Injection",
    //   category: 0,
    //   page: 1,
    //   content: "test입니다.",
    //   image:
    //     "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    // });

    res.send({ testMessage: "더미데이터 추가 완료" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
