import { MESSAGE } from "common";

// 아이디 유효성 검사
const idValidation = (id) => {
	// 이메일 형식 유효성 검사
	const idReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!idReg.test(id)) {
		return MESSAGE.ERROR.EMAIL_INVALIDATION;
	} else {
		return "";
	}
};

// 비밀번호 유효성 검사
const pwValidation = (pw) => {
	// 비밀번호 유효성 검사 (5자 이상)
	const pwReg = /^.{5,}$/;

	if (!pwReg.test(pw)) {
		return MESSAGE.ERROR.PW_INVALIDATION;
	} else {
		return "";
	}
};

// 모달창 크기 조절 함수
const modalWidth = (popup) => {
	let width;
	switch (popup) {
		case "selectTag":
			width = 450;
			break;
		case "novIntro":
			width = 400;
			break;
		case "authorWriteIntro":
			width = 400;
			break;
		case "novCover":
			width = 400;
			break;
		case "authorDetail":
			width = "85%";
			break;
		default:
			width = "90%";
	}
	return width;
};

const modalHeight = (popup) => {
	let height;
	switch (popup) {
		case "selectTag":
			height = 390;
			break;
		case "novIntro":
			height = 500;
			break;
		case "authorWriteIntro":
			height = 500;
			break;
		case "novCover":
			height = 500;
			break;
		case "authorDetail":
			height = 355;
			break;
		default:
			height = "90vh";
	}
	return height;
};

export { idValidation, pwValidation, modalWidth, modalHeight };
