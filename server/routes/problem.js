const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { CodingTest } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await CodingTest.findAll({
      attributes: [
        "id",
        "title",
        "category",
        "level",
        "cntOfSolve",
        "cntOfRun",
        "timeAverage",
      ],
    });
    res.send({
      user: req.user,
      results: results,
      testMessage: "코딩 테스트 페이지에 왔습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류" });
  }
});

// 문제 클릭 라우터

// 문제 채점 라우터

module.exports = router;
