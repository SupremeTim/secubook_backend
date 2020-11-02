const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Education, CodingTest, Board } = require("../models");

const router = express.Router();

router.get("/", (req, res, next) => {
  // console.log("check");
  // console.log("메인 라우터입니다.");
  // console.log(req.user);
  res.send({ user: req.user, test: "테스트" });
});

// 로그인 미들웨어 추가 필요
router.get("/mypage", async (req, res, next) => {
  const { name, level, studyList, codingList } = req.user;
  const sList = studyList.split(",");
  const cList = codingList.split(",");

  try {
    const boardResult = await Board.findAll({
      where: {
        userId: req.user.id,
      },
      attributes: ["id", "title", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    // 코딩테스트 정보 보내주기 추가 필요

    // studys에는 title/category 형식으로 들어가 있음
    // ex) ["SQL-Injection/0","XSS/1"]
    res.send({
      user: req.user,
      name: name,
      level: level,
      boards: boardResult,
      studys: sList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류" });
  }
});

module.exports = router;
