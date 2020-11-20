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

router.get("/detail/:id", isLoggedIn, async (req, res, next) => {
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

// 댓글 추가 라우터
router.post("/comment", isLoggedIn, async (req, res) => {
  const { content, boardId } = req.body;

  try {
    await Comment.create({
      host: req.user.name,
      content,
      boardId,
    });

    res.redirect("/talk/detail/" + boardId);
    // res.send({ testMessage: "댓글 추가 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

// 게시판 추가 라우터
router.post("/add", isLoggedIn, async (req, res) => {
  const { title, content } = req.body;
  try {
    await Board.create({
      title,
      content,
      userId: req.user.id,
    });

    res.redirect("/talk");
    // res.send({ testMessage: "게시판 추가 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

module.exports = router;
