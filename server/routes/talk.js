const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Board, User } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await Board.findAll({
      include: {
        model: User,
        attributes: ["name"],
      },
      attributes: ["id", "title", "createdAt"],
      order: [["createdAt", "DESC"]],
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

// 세부내용 라우터 추가

// 게시판 추가 라우터 추가

module.exports = router;
