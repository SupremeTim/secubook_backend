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
router.post("/check", isLoggedIn, async (req, res, next) => {
  const { userAnswer, level } = req.body;

  try {
    const result = await Drill.findAll({
      where: {
        level: level,
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

    if (req.user.level < level) {
      await User.update(
        {
          level: level,
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
      testMessage: "유저의 레벨을 업데이트했습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

module.exports = router;
