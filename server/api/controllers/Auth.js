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


// 회원가입 함수
const join = async (req, res, next) => {
  try {
    // 뒤의 서비스와 DB 돌리는 작업
    const data = await svc.join({ ...req.body });

    // console.log(data,1111)

    // 아래 if문은 조건에 따라 서버로 값을 보내는 로직
    if (data) {
      // console.log(data,2222)
      res.send({ id: data });
    } else {
      res.send('이미 가입된 정보입니다.');
    }
    // console.log(data,89798)
  } catch (err) {
    console.log(err);
  }
};

router.post("/login", login);
router.post("/join", join);

module.exports = router;
