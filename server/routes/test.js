const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", isNotLoggedIn, (req, res, next) => {
  console.log("check");
  res.status(400).send("안녕");
});

module.exports = router;
