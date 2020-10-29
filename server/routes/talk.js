const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Board } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await Board.findAll({
      order: [["createdAt", "ASC"]],
    });

    res.send({
      user: req.user,
      results: results,
      testMessage: "모든 게시판 글을 불러왔습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

module.exports = router;
