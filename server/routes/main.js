const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", (req, res, next) => {
  // console.log("check");

  res.send({ user: req.user, test: "test" });
});

module.exports = router;
