const { Router } = require("express");
const router = Router();

const svc = require("../services/AuthService");

// 로그인 함수
const login = async (req, res, next) => {
  console.log(req.body, 123456);
  try {
    const data = await svc.login({ ...req.body });
    if (data === 1) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    console.log(err);
  }
};

router.post("/login", login);


module.exports = router;
