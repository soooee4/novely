const { Router } = require("express");
const router = Router();

const svc = require("../services/AuthService");

// 로그인 함수
const login = async (req, res, next) => {
  try {
    const data = await svc.login({ ...req.body });

    if (data) {
      res.send(data[0]);

    } else {
      res.send(false);
    }
  } catch (err) {
    console.log(err);
  }
};

router.post("/login", login);


module.exports = router;
