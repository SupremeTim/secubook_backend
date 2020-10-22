const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { User } = require("../models");

const router = express.Router();

router.get("/", isNotLoggedIn, async (req, res, next) => {
  res.send({ testMessage: "회원가입 화면에 왔습니다." });
});

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  // 받아 올 정보 정하기
  const { email, nick, password } = req.body;
  try {
    // 변경 필요
    const exUser = await User.findOne({ where: email });
    if (exUser) {
      req.flash("joinError", "이미 가입된 이메일입니다.");
      return res.redirect("/join");
    }
    const hash = await bcrypt.hash(password, 12);
    // 변경 필요
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      // return next(authError);
      return res.status(500).send({ errorMessage: authError });
    }
    if (!user) {
      req.flash("loginError", info.message);
      // return res.redirect("/");
      return res.status(401).send({ errorMessage: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        // return next(loginError);
        return res.status(401).send({ errorMessage: loginError });
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
