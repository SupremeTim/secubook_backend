const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Board, User, Comment } = require("../models");

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

// 로그인 미들웨어 추가 필요
router.get("/detail/:id", async (req, res, next) => {
  try {
    const results = await Board.findOne({
      include: {
        model: Comment,
        attributes: ["host", "content", "createdAt"],
      },
      attributes: ["title", "content", "createdAt"],
      where: {
        id: req.params.id,
      },
    });

    res.send({
      user: req.user,
      results: results,
      testMessage: "선택 게시판 내용과 댓글을 불러왔습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

// 게시판 추가 라우터 추가

module.exports = router;
