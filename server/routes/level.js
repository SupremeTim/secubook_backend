const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Drill } = require("../models");

const router = express.Router();

// 레벨 테스트 페이지
router.get("/", (req, res, next) => {
  res.send({ user: req.user, testMessage: "레벨 테스트 페이지에 왔습니다." });
});

// 레벨 테스트 문제 클릭

// 레벨 테스트 정답 확인

module.exports = router;
