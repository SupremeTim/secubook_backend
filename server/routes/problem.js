const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { CodingTest, User, TimeInfo } = require("../models");
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

    // Todo 1
    // home/ubuntu/user/userCode/[email]/problem[problemNumber].java를
    // userCode로 덮어쓰기

    // 배포용
    shell.mkdir("/home/ubuntu/user/userCode/" + req.user.email);
    const targetPath =
      "/home/ubuntu/user/userCode/" +
      req.user.email +
      "problem" +
      problemNumber +
      ".java";
    shell.touch(targetPath);
    shell.echo(userCode).to(targetPath);

    // 로컬용
    // shell.mkdir("~/test");
    // const path = "~/test/problem" + problemNumber + ".java";
    // shell.touch(path);
    // shell.echo(userCode).to(path);

    // Todo 2
    // 사용자 도커 컨테이너로 채점
    // ./score-code.sh [email] [problemNumber]

    shell.cd("/home/ubuntu/secubook_problem");
    if (
      shell.exec("./score_code.sh " + req.user.email + " " + problemNumber)
        .code !== 0
    ) {
      shell.echo("Error: command failed");
      shell.exit(1);
    }

    // 현재 문제 정보 가져옴
    const problem = await CodingTest.findOne({
      where: { id: problemNumber },
    });
    // 현재 문제 실행 횟수 업데이트
    await CodingTest.update(
      {
        cntOfRun: problem.cntOfRun + 1,
      },
      {
        where: {
          id: problemNumber,
        },
      }
    );

    // Todo 3
    // log 저장 방식 : 연도(yyyy-MM-dd HH:mm:ss) 시간 아이디 문제번호 정답여부(0/1)
    // log.txt 파일 분석 후 결과 전송 -> 현재 시간 측정 후 그 이후 첫번째꺼
    // 결과에 따라 유저의 codingTest 리스트 수정

    // const data = fs.readFileSync("/Users/cho/test/무제.txt", "utf8");
    // console.log(data);
    const data = fs.readFileSync(
      "/home/ubuntu/secubook/log/score/log.txt",
      "utf8"
    );
    const result = data.split("\n");
    // console.log(result);
    const now = dateFormat(today, "yyyy-mm-dd HH:mm:ss").split(" ");
    const d = new Date(now[0] + " " + now[1]);

    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      // console.log(element);
      const dataArr = element.split(" ");
      const targetD = new Date(dataArr[0] + " " + dataArr[1]);
      if (dataArr[2] == req.user.email && dataArr[3] == String(problemNumber)) {
        if (targetD.getTime() >= d.getTime()) {
          if (dataArr[4] == 0) {
            // console.log("틀림");
            return res.send({ result: "틀렸습니다." });
          } else {
            // console.log("맞음");

            // 현재 문제 정답 수 업데이트
            await CodingTest.update(
              {
                cntOfSolve: problem.cntOfSolve + 1,
              },
              {
                where: {
                  id: problemNumber,
                },
              }
            );

            // 현재 문제 푸는 걸린 시간 정보 삽입
            await TimeInfo.create({
              time: time,
              codingTestId: problemNumber,
            });

            // 현재 문제 푸는데 걸린 평균 시간 업데이트
            // 아무것도 없다면
            if (problem.timeAverage == null) {
              await CodingTest.update(
                {
                  timeAverage: time,
                },
                {
                  where: {
                    id: problemNumber,
                  },
                }
              );
              // 뭔가 하나라도 있다면
            } else {
              // 이 문제와 관련된 모든 시간 정보 가져옴
              const allTimes = await TimeInfo.findAll({
                where: {
                  codingTestId: problemNumber,
                },
                attributes: ["time"],
              });

              // 걸린 시간 총 합 구하기
              var allTimeNum = 0;
              for (let index = 0; index < allTimes.length; index++) {
                const element = allTimes[index].time;
                allTimeNum += element;
              }

              // 평균 값 업데이트
              await CodingTest.update(
                {
                  timeAverage: result / allTimes.length,
                },
                {
                  where: {
                    id: problemNumber,
                  },
                }
              );
            }

            // 사용자 정보 업데이트
            if (!req.user.codingList.includes(problemNumber)) {
              await User.update(
                {
                  studyList: req.user.codingList + "," + problemNumber,
                },
                {
                  where: {
                    id: req.user.id,
                  },
                }
              );
            }
            return res.send({ result: "맞았습니다." });
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMessage: "서버 내부 오류" });
  }
});

module.exports = router;
