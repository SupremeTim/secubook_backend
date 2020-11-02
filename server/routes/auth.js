const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { User } = require("../models");
const shell = require("shelljs"); //https://backback.tistory.com/361 [Back Ground

const router = express.Router();

router.get("/", isNotLoggedIn, async (req, res, next) => {
  res.send({ testMessage: "로그인/회원가입 화면에 왔습니다." });
});

router.get("/register", isNotLoggedIn, async (req, res, next) => {
  res.send({ testMessage: "회원가입 화면에 왔습니다." });
});

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email: email } });

    if (exUser) {
      req.flash("joinError", "이미 가입된 이메일입니다.");
      return res.status(409).send({ errorMessage: "중복된 이메일입니다." }); // https://blog.outsider.ne.kr/1121 참고
    }

    const hash = await bcrypt.hash(password, 12);

    // 도커 생성 해야 됨!!!
    await User.create({
      name,
      email,
      password: hash,
      level: 1,
      dockerPort: 80,
    });

    shell.cd("/home/ubuntu/secubook_problem");

    if (shell.exec("./create_container.sh " + email).code !== 0) {
      shell.echo("Error: command failed");
      shell.exit(1);
    }

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    // return next(error);
    return res.status(500).send({ errorMessage: error });
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  // console.log("1");
  passport.authenticate("local", (authError, user, info) => {
    // console.log("2");
    if (authError) {
      console.error(authError);
      // return next(authError);
      return res.status(500).send({ errorMessage: authError });
    }
    // console.log("3");
    if (!user) {
      req.flash("loginError", info.message);
      // return res.redirect("/");
      return res.status(401).send({ errorMessage: info.message });
    }
    console.log(user);
    return req.login(user, (loginError) => {
      // console.log("5");
      if (loginError) {
        console.error(loginError);
        // return next(loginError);
        return res.status(401).send({ errorMessage: loginError });
      }
      // console.log("6");
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
