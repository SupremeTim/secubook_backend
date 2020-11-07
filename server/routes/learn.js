const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Education, Drill, User } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await Education.findAll({
      where: {
        page: 0,
      },
      attributes: ["title", "category"],
    });

    res.send({
      user: req.user,
      results: results,
      testMessage: "learn 페이지에 왔습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

router.get("/:category", isLoggedIn, async (req, res, next) => {
  const { title } = req.query;

  try {
    const results = await Education.findAll({
      where: {
        title: title,
        category: req.params.category,
      },
      attributes: ["content", "image"],
      order: [["page", "ASC"]],
    });

    res.send({
      user: req.user,
      results: results,
      testMessage: "학습 내용을 불러왔습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

router.get("/test/:type", isLoggedIn, async (req, res, next) => {
  const { title } = req.query;

  try {
    const results = await Drill.findAll({
      where: {
        title: title,
        type: req.params.type,
      },
      attributes: ["content", "image", "answer"],
    });

    res.send({
      user: req.user,
      results: results,
      testMessage: "미니 문제를 불러왔습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

// 문제 풀기 버튼
router.get("/check/:category", isLoggedIn, async (req, res, next) => {
  const { title } = req.query;

  try {
    const u = await User.findOne({
      where: { id: req.user.id },
      attributes: ["studyList"],
    });

    await User.update({
      studyList: u.studyList + "," + title + "/" + req.params.category,
      where: {
        id: req.user.id,
      },
    });

    res.send({
      user: req.user,
      testMessage: "유저의 학습 리스트를 업데이트했습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

module.exports = router;
