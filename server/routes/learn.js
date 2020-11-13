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
      attributes: ["content", "image"],
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
router.post("/check", isLoggedIn, async (req, res, next) => {
  const { userAnswer, title, type } = req.body;

  try {
    const result = await Drill.findAll({
      where: {
        title: title,
        type: type,
      },
      attributes: ["answer"],
    });

    // res.send({ r: result });
    for (let index = 0; index < userAnswer.length; index++) {
      const element1 = userAnswer[index];
      const element2 = result[index].answer;

      if (element1 != element2) {
        return res.status(200).send({
          result: "틀렸습니다.",
        });
      }
    }

    const newValue = title + "/" + type;
    if (!req.user.studyList.includes(newValue)) {
      await User.update(
        {
          studyList: req.user.studyList + "," + newValue,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
    }

    return res.send({
      result: "모두 맞았습니다.",
      testMessage: "유저의 학습 리스트를 업데이트했습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

module.exports = router;
