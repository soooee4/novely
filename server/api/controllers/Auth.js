const { Router } = require("express");
const router = Router();

const svc = require("../services/AuthService");
const { parsingFormData } = require("../../common/util");

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
      // res.send({ id: data });
      res.send(data);
    } else {
      res.send('이미 가입된 정보입니다.');
    }
    // console.log(data,89798)
  } catch (err) {
    console.log(err);
  }
};

// 프로필 수정 함수
const editProfile = async (req, res, next) => {
	try {
    console.log(req.body)

		// const data = await svc.editProfile({ ...req.body });
    // res.send(data);

	} catch (err) {
		console.log(err); 
	}
};

// 로그인
router.post("/login", login);

// 회원가입
router.post("/join", join); 

// 회원 정보 수정
router.patch("/editProfile", parsingFormData, editProfile);

module.exports = router;
