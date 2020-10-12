const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("check");
  res.render("main", {});
});

module.exports = router;
