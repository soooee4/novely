const { Router } = require("express");
const router = Router();

const svc = require("../services/AuthService");
const { parsingFormData } = require("../../common/util");
const { fileUpload } = require("../../common/controller");


// 로그인
const login = async (req, res, next) => {

  try {
    const data = await svc.login({ ...req.body });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};


// 회원가입
const join = async (req, res, next) => {
  try {
    const data = await svc.join({ ...req.body });
    res.send(data);
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

// 작가 권한 첫 로그인
const authorFirstLogin = async (req, res, next) => {
	try {
    const data = await svc.authorFirstLogin({ ...req.body });
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

// 작가 권한 첫 로그인
router.patch("/patchFirstAuthor", authorFirstLogin);

module.exports = router;