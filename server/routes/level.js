const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Drill } = require("../models");

const router = express.Router();

// 레벨 테스트 페이지
router.get("/", (req, res, next) => {
  res.send({ user: req.user, testMessage: "레벨 테스트 페이지에 왔습니다." });
});

// 레벨 테스트 문제 클릭
router.post("/test", isLoggedIn, async (req, res, next) => {
  const { level } = req.body;
  try {
    const result = await Drill.findAll({
      where: {
        level: level,
      },
      attributes: ["content", "image"],
    });

    res.send({ result: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

// 레벨 테스트 정답 확인

module.exports = router;
