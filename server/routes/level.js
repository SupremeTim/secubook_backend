const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Drill } = require("../models");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send({ user: req.user, testMessage: "레벨 테스트 페이지에 왔습니다." });
});

module.exports = router;
