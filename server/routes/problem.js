const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { CodingTest } = require("../models");

const router = express.Router();

router.get("/", (req, res, next) => {
  const results = CodingTest.findAll({
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
  res.send({ user: req.user, testMessage: "코딩 테스트 페이지에 왔습니다." });
});

module.exports = router;
