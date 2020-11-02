const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { CodingTest } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await CodingTest.findAll({
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
    res.send({
      user: req.user,
      results: results,
      testMessage: "코딩 테스트 페이지에 왔습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류" });
  }
});

// 문제 클릭 라우터
router.get("/:problemNumber", async (req, res, next) => {
  try {
    let problemNumber = req.params.problemNumber
    console.log(problemNumber)

    const results = await CodingTest.findOne({
      attributes: [
        "id", 
        "category",
        "title",
        "content"
      ],
      where: {
        id: problemNumber,
      },
    });


    console.log(results);

    res.send({
      user: req.user,
      status : 200,
      message: "문제 상세 조회",
      data: results
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류" });
  }
});

// 문제 채점 라우터
router.post("/:problemNumber", async (req, res, next) => {
  const { email, userCode } = req.body;
  try {
    let problemNumber = req.params.problemNumber
    console.log(problemNumber)
    console.log(email)
    console.log(userCode)

    // Todo
    // home/ubuntu/user/userCode/[email]/problem[problemNumber].java를
    // userCode로 덮어쓰기

    // 사용자 도커 컨테이너로 채점
    // ./score-code.sh [email] [problemNumber]

    // log 파일 분석 후 결과 전송

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    // return next(error);
    return res.status(500).send({ errorMessage: error });
  }
});


module.exports = router;
