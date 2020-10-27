const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Education } = require("../models");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send({ user: req.user, testMessage: "learn 페이지에 왔습니다." });
});

router.get("/:category", async (req, res, next) => {
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

    // console.log(results);
    // for (const key in results) {
    //   if (results.hasOwnProperty(key)) {
    //     const element = results[key].content;
    //     console.log(element);
    //   }
    // }
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

module.exports = router;