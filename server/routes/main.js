const express = require("express");
const path = require("path");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Education, CodingTest, Board } = require("../models");

const router = express.Router();

router.get("/", (req, res, next) => {
  // console.log("check");
  // console.log("메인 라우터입니다.");
  // console.log(req.user);
  console.log(req.cookies);
  res.send({ user: req.user, cookie: req.cookies, req: req, test: "테스트" });
  // res.render("main", { user: req.user, test: "test" });
});

// router.get("/main", (req, res, next) => {
//   res.send(
//     express.static(path.join(__dirname, "../../front/build/index.html"))
//   );
// });

// 로그인 미들웨어 추가 필요
router.get("/mypage", isLoggedIn, async (req, res, next) => {
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

    // studys에는 title/category 형식으로 들어가 있음
    // ex) ["SQL-Injection/0","XSS/1"]
    // codings에는 title/id 형식으로 들어가 있음
    // ex) ["문제1/1","문제2/2"]

    res.send({
      user: req.user,
      name: name,
      level: level,
      boards: boardResult,
      studys: sList,
      codings: cList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류" });
  }
});

// 공부했던 내용 클릭해서 다시 확인하도록 해야하나???

module.exports = router;
