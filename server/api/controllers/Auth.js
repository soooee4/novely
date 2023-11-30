const { Router } = require("express");
const router = Router();

const svc = require("../services/AuthService");
const { parsingFormData } = require("../../common/util");
const { fileUpload } = require("../../common/controller");
const { MESSAGE } = require("../../common/message");


// 로그인
const login = async (req, res, next) => {
  try {
    const data = await svc.login({ ...req.body });

    if (data) {
      res.send(data[0]);
    } else {
      res.send(MESSAGE.UNMATCHED_LOGIN_INFO);
    }
  } catch (err) {
    console.log(err);
  }
};


// 회원가입
const join = async (req, res, next) => {
  try {
    // 뒤의 서비스와 DB 돌리는 작업
    const data = await svc.join({ ...req.body });

    // 아래 if문은 조건에 따라 서버로 값을 보내는 로직
    if (data) {
      res.send(data);

    } else {
      res.send(MESSAGE.ALREADY_JOINED);
    }

  } catch (err) {
    console.log(err);
  }
};

// 프로필 수정
const editProfile = async (req, res, next) => {
	try {
    const data = await svc.editProfile({ ...req.body });
    res.send(data);

	} catch (err) {
		console.log(err); 
	}
};
 
// 작가 권한일 시 프로필 수정
const AuthorEditProfile = async (req, res, next) => {
	try {
		const data = await svc.editProfile({ ...req.body });
    res.send(data);

	} catch (err) {
		console.log(err); 
	}
};

// 로그인
router.post("/login", login);

// 회원가입
router.post("/join", join); 

// 회원 정보 수정
router.patch("/editProfile", parsingFormData, fileUpload, editProfile);

// 작가회원 정보 수정
router.patch("/AuthorEditProfile", parsingFormData, fileUpload, AuthorEditProfile);

module.exports = router;