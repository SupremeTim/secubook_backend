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

  // 교육 이수 여부에 따라 하고 못하고 정하기!!!
  switch (level) {
    case 1:
      if (
        !(
          req.user.studyList.includes("크로스-사이트-스크립팅/1") &&
          req.user.studyList.includes("웹-서비스-요청-및-결과-검증/0")
        )
      ) {
        return res.send({
          user: req.user,
          result: "이수 조건을 만족하지 못해 진행할 수 없습니다.",
        });
      }
      break;
    case 2:
      if (
        !(
          req.user.studyList.includes("크로스-사이트-스크립팅/1") &&
          req.user.studyList.includes("웹-서비스-요청-및-결과-검증/0") &&
          req.user.studyList.includes("SQL-INJECTION/1") &&
          req.user.studyList.includes("DBMS-조회-및-결과-검증/0") &&
          req.user.studyList.includes("XML조회-및-결과-검증/0")
        )
      ) {
        return res.send({
          user: req.user,
          result: "이수 조건을 만족하지 못해 진행할 수 없습니다.",
        });
      }
      break;
    case 3:
      if (
        !(
          req.user.studyList.includes("크로스-사이트-스크립팅/1") &&
          req.user.studyList.includes("웹-서비스-요청-및-결과-검증/0") &&
          req.user.studyList.includes("SQL-INJECTION/1") &&
          req.user.studyList.includes("DBMS-조회-및-결과-검증/0") &&
          req.user.studyList.includes("XML조회-및-결과-검증/0") &&
          req.user.studyList.includes("파라미터-조작/1") &&
          req.user.studyList.includes("명령어-삽입/1") &&
          req.user.studyList.includes("파일-업로드/1") &&
          req.user.studyList.includes(
            "시스템-자원-접근-및-명령어-수행-입력값-검증/0"
          ) &&
          req.user.studyList.includes("HTTP-프로토콜-유효성-검증/0") &&
          req.user.studyList.includes("업로드/다운로드-파일-검증/0") &&
          req.user.studyList.includes("암호화/1")
        )
      ) {
        return res.send({
          user: req.user,
          result: "이수 조건을 만족하지 못해 진행할 수 없습니다.",
        });
      }
    default:
      break;
  }

  try {
    const result = await Drill.findAll({
      where: {
        level: level,
      },
      attributes: ["content", "image"],
    });

    return res.send({
      user: req.user,
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

// 레벨 테스트 정답 확인
router.post("/check", isLoggedIn, async (req, res, next) => {
  const { level } = req.body;

  try {
    // const result = await Drill.findAll({
    //   where: {
    //     level: level,
    //   },
    //   attributes: ["answer"],
    // });

    // res.send({ r: result });
    // for (let index = 0; index < userAnswer.length; index++) {
    //   const element1 = userAnswer[index];
    //   const element2 = result[index].answer;

    //   if (element1 != element2) {
    //     return res.status(200).send({
    //       user: req.user,
    //       result: "틀렸습니다.",
    //     });
    //   }
    // }

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
      user: req.user,
      // result: "모두 맞았습니다.",
      testMessage: "유저의 레벨을 업데이트했습니다.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errorMessage: "서버 내부 오류입니다." });
  }
});

module.exports = router;
