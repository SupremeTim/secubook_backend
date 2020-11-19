const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { CodingTest, User } = require("../models");
const shell = require("shelljs"); //https://backback.tistory.com/361 [Back Ground
const fs = require("fs");
const dateFormat = require("dateformat");

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
    console.log(dateFormat(today, "yyyy-mm-dd HH:mm:ss"));

    // Todo
    // home/ubuntu/user/userCode/[email]/problem[problemNumber].java를
    // userCode로 덮어쓰기

    // 배포용
    // shell.mkdir("/home/ubuntu/user/userCode/" + req.user.email);
    // const targetPath =
    //   "/home/ubuntu/user/userCode/" +
    //   req.user.email +
    //   "problem" +
    //   problemNumber +
    //   ".java";
    // shell.touch(targetPath);
    // shell.echo(userCode).to(targetPath);

    // 로컬용
    // shell.mkdir("~/test");
    // const path = "~/test/problem" + problemNumber + ".java";
    // shell.touch(path);
    // shell.echo(userCode).to(path);

    // 사용자 도커 컨테이너로 채점
    // ./score-code.sh [email] [problemNumber]

    // shell.cd("/home/ubuntu/secubook_problem");
    // if (
    //   shell.exec("./score_code.sh " + req.user.email + " " + problemNumber)
    //     .code !== 0
    // ) {
    //   shell.echo("Error: command failed");
    //   shell.exit(1);
    // }

    // log 저장 방식 : 연도(yyyy-MM-dd HH:mm:ss) 시간 아이디 문제번호 정답여부(0/1)
    // log.txt 파일 분석 후 결과 전송 -> 현재 시간 측정 후 그 이후 첫번째꺼
    // 결과에 따라 유저의 codingTest 리스트 수정

    const data = fs.readFileSync("/Users/cho/test/무제.txt", "utf8");
    console.log(data);

    res.send({});
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "서버 내부 오류" });
  }
});

module.exports = router;
