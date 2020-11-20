const express = require("express");
const {
  User,
  Education,
  Drill,
  Board,
  Comment,
  CodingTest,
} = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await Drill.create({
      title: "SQL-Injection",
      type: 0,
      level: 0,
      content: "test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
      answer: "정답입니다",
    });

    await User.create({
      name: "조인택",
      email: "dlsxor21c@naver.com",
      password: "",
      level: 0,
      dockerPort: 80,
    });

    await Board.create({
      title: "궁금해요!4444",
      content: "test입니다.44",
      userId: 1,
    });

    await Board.create({
      title: "궁금해요555",
      content: "test입니다.5555",
      userId: 1,
    });

    await Comment.create({
      host: "dlsxor21c@naver.com",
      content: "test입니다.5555",
      boardId: 1,
    });

    await Comment.create({
      host: "dlsxor21c@naver.com",
      content: "test입니다.5555",
      boardId: 1,
    });

    await Education.create({
      title: "XML조회-및-결과-검증",
      category: 0,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg&&https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    await Education.create({
      title: "XML조회-및-결과-검증",
      category: 0,
      page: 1,
      content: "test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg&&https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    await Education.create({
      title: "DBMS-조회-및-결과-검증",
      category: 0,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    await Education.create({
      title: "파라미터-조작",
      category: 1,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    await Education.create({
      title: "명령어-삽입",
      category: 1,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    await Education.create({
      title: "파일-업로드",
      category: 1,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    await Education.create({
      title: "웹-서비스-요청-및-결과-검증",
      category: 0,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });
    await Education.create({
      title: "시스템-자원-접근-및-명령어-수행-입력값-검증",
      category: 0,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });
    // Education.create({
    //   title: "웹-기반-중요기능-수행-요청-유효성-검증",
    //   category: 0,
    //   page: 0,
    //   content: "test입니다.&&test입니다.",
    //   image:
    //     "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    // });
    await Education.create({
      title: "HTTP-프로토콜-유효성-검증",
      category: 0,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });
    // Education.create({
    //   title: "허용된-범위-내-메모리-접근",
    //   category: 0,
    //   page: 0,
    //   content: "test입니다.&&test입니다.",
    //   image:
    //     "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    // });
    await Education.create({
      title: "업로드/다운로드-파일-검증",
      category: 0,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    await Education.create({
      title: "SQL-INJECTION",
      category: 1,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });
    // Education.create({
    //   title: "취약한-인증",
    //   category: 1,
    //   page: 0,
    //   content: "test입니다.&&test입니다.",
    //   image:
    //     "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    // });
    await Education.create({
      title: "크로스-사이트-스크립팅",
      category: 1,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });

    await Education.create({
      title: "암호화",
      category: 1,
      page: 0,
      content: "test입니다.&&test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    });
    // Education.create({
    //   title: "취약한-접근-제어",
    //   category: 1,
    //   page: 0,
    //   content: "test입니다.&&test입니다.",
    //   image:
    //     "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    // });
    // Education.create({
    //   title: "보안-설정-오류",
    //   category: 1,
    //   page: 0,
    //   content: "test입니다.&&test입니다.",
    //   image:
    //     "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    // });
    // Education.create({
    //   title: "민감-데이터-노출",
    //   category: 1,
    //   page: 0,
    //   content: "test입니다.&&test입니다.",
    //   image:
    //     "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
    // });

    await Drill.create({
      title: "XML조회-및-결과-검증",
      type: 0,
      level: 0,
      content: "test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
      answer: "정답입니다",
    });

    await Drill.create({
      title: "XML조회-및-결과-검증",
      type: 0,
      level: 0,
      content: "test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
      answer: "정답입니다",
    });

    await Drill.create({
      title: "레벨테스트1",
      type: 0,
      level: 1,
      content: "level1 test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
      answer: "1",
    });

    await Drill.create({
      title: "레벨테스트1",
      type: 0,
      level: 1,
      content: "level1 test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
      answer: "2",
    });

    await Drill.create({
      title: "레벨테스트2",
      type: 0,
      level: 2,
      content: "level2 test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
      answer: "1",
    });

    await Drill.create({
      title: "레벨테스트3",
      type: 0,
      level: 3,
      content: "level3 test입니다.",
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/Unknown.jpeg",
      answer: "1",
    });

    await CodingTest.create({
      title: "XSS 1",
      content:
        "keyword라는 파라미터로 넘어온 검색어를 화면에 띄워주려한다. xss 취약점이 존재하는 코드를 수정하시오.",
      category: 0,
      level: 1,
      image: "",
    });

    await CodingTest.create({
      title: "File upload 1",
      content:
        "JPG파일만 업로드 가능하게 하는 코드를 작성하시오. (endsWith 함수 사용)",
      category: 0,
      level: 1,
      image: "",
    });

    await CodingTest.create({
      title: "File upload 2",
      content:
        "파일명에 NULL이 들어가 생길수 있는 파일확장자 문제를 해결하시오. (substring 함수 사용)",
      category: 0,
      level: 1,
      image: "",
    });

    await CodingTest.create({
      title: "File upload 3",
      content:
        ".php파일의 업로드를 막고 .php3, .php4 등으로 우회 가능한 경우 발생할 수 있는 문제를 해결하시오. (정규식 : ^S+.(?i)(php)+[0-9])",
      category: 0,
      level: 2,
      image: "",
    });

    await CodingTest.create({
      title: "명령어 삽입 1",
      content:
        "특수 문자(| ; & :)나 파일 리다이렉트 특수문자(>)을 제거하여 원하지 않은 운영체제 명령어가 실행 될 수 없도록 필터링을 수행하시오.",
      category: 0,
      level: 2,
      image: "",
    });

    await CodingTest.create({
      title: "명령어 삽입 2",
      content:
        "해당 프로그램에서 실행할 프로그램을 제한하지 않고 있기 때문에 외부의 공격자는 가능한 모든 프로그램을 실행시킬 수 있다. notepad와 calculator만 실행 할 수 있게 하는 코드를 작성하시오.",
      category: 0,
      level: 3,
      image: "",
    });

    await CodingTest.create({
      title: "암호화 1",
      content:
        "파라미터로 전달되는 msg를 암호화 알고리즘으로 암호화 하려 한다. 현재 안전하지 않은 암호 알고리즘이 적용되어 있는 코드를 안전한 암호 알고리즘이 적용되도록 수정하시오.",
      category: 0,
      level: 2,
      image: "",
    });

    await CodingTest.create({
      title: "Sql injection 1",
      content:
        "다음과 같이 user 테이블과 데이터가 일부 주어졌다. position이 Manager인 user의 firstname을 안전하게 불러오도록 코딩하시오.",
      category: 0,
      level: 1,
      image:
        "https://secubook-img-data.s3.ap-northeast-2.amazonaws.com/그림1.png",
    });

    await CodingTest.create({
      title: "Sql injection 2",
      content:
        "파라미터로 전달되는 msg를 암호화 알고리즘으로 암호화 하려 한다. 현재 안전하지 않은 암호 알고리즘이 적용되어 있는 코드를 안전한 암호 알고리즘이 적용되도록 수정하시오.",
      category: 0,
      level: 2,
      image: "",
    });
    res.send({ testMessage: "더미데이터 추가 완료" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/add", async (req, res, next) => {
  try {
    res.send({ testMessage: "더미데이터 추가 완료" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
