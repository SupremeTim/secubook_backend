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
router.get("/:problemNumber", isLoggedIn, async (req, res, next) => {
  try {
    let problemNumber = req.params.problemNumber;
    // console.log(problemNumber);

    const results = await CodingTest.findOne({
      attributes: ["content", "image"],
      where: {
        id: problemNumber,
      },
    });

    // console.log(results);

    res.send({
      testMessage: "문제 상세 조회",
      results: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류" });
  }
});

// 문제 채점 라우터
router.post("/check", async (req, res, next) => {
  const { userCode, problemNumber, time } = req.body;
  try {
    // 시간초 측정!!!
    const today = new Date();
    console.log(today.format("yyy-MM-dd HH:mm:ss"));

    // Todo
    // home/ubuntu/user/userCode/[email]/problem[problemNumber].java를
    // userCode로 덮어쓰기

    // 사용자 도커 컨테이너로 채점
    // ./score-code.sh [email] [problemNumber]

    // log 저장 방식 : 연도(yyyy-MM-dd HH:mm:ss) 시간 아이디 문제번호 정답여부(0/1)
    // log.txt 파일 분석 후 결과 전송 -> 현재 시간 측정 후 그 이후 첫번째꺼
    // 결과에 따라 유저의 codingTest 리스트 수정

    res.send({});
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류" });
  }
});

module.exports = router;
