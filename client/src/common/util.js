// /** 공통 코드 모음  */

// import { MESSAGE } from "common";

// // 아이디 유효성 검사
// const idValidation = (id) => {
// 	// 이메일 형식 유효성 검사
// 	const idReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 	if (!idReg.test(id)) {
// 		return MESSAGE.ERROR.EMAIL_INVALIDATION;
// 	} else {
// 		return "";
// 	}
// };

// // 비밀번호 유효성 검사
// const pwValidation = (pw) => {
// 	// 비밀번호 유효성 검사 (5자 이상)
// 	const pwReg = /^.{5,}$/;

// 	if (!pwReg.test(pw)) {
// 		return MESSAGE.ERROR.PW_INVALIDATION;
// 	} else {
// 		return "";
// 	}
// };

// // 모달창 크기 조절 함수
// const modalWidth = (popup) => {
// 	let width;
// 	switch (popup) {
// 		case "selectTag":
// 			width = 450;
// 			break;
// 		case "novIntro":
// 			width = 400;
// 			break;
// 		case "authorWriteIntro":
// 			width = 400;
// 			break;
// 		case "novCover":
// 			width = 400;
// 			break;
// 		case "authorDetail":
// 			width = "85%";
// 			break;
// 		case "editProfile":
// 			width = 400;
// 			break;
// 		case "login":
// 			width = 600;
// 			break;
// 		case "join":
// 			width = 600;
// 			break;
// 		default:
// 			width = "90%";
// 	}
// 	return width;
// };

// const modalHeight = (popup) => {
// 	let height;
// 	switch (popup) {
// 		case "selectTag":
// 			height = 390;
// 			break;
// 		case "novIntro":
// 			height = 500;
// 			break;
// 		case "authorWriteIntro":
// 			height = 500;
// 			break;
// 		case "novCover":
// 			height = 500;
// 			break;
// 		case "authorDetail":
// 			height = 353;
// 			break;
// 		case "editProfile":
// 			height = 600;
// 			break;
// 		case "login":
// 			height = 370;
// 			break;
// 		case "join":
// 			height = 370;
// 			break;
// 		default:
// 			height = "90vh";
// 	}
// 	return height;
// };

// export { idValidation, pwValidation, modalWidth, modalHeight };
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

// 모달 넓이 조절 
const modalWidth = (popup) => {
	let width;
	switch (popup) {
		case "selectTag":
			width = 450;
			break;
		case "novIntro":
			width = 450;
			break;
		case "authorWriteIntro":
			width = 400;
			break;
		case "novCover":
			width = 450;
			break;
		case "authorDetail":
			width = "85%";
			break;
		case "editProfile":
			width = 400;
			break;
		case "login":
			width = 600;
			break;
		case "join":
			width = 600;
			break;
		default:
			width = "90%";
	}
	return width;
};

// 모달 높이 조절
const modalHeight = (popup) => {
	let height;
	switch (popup) {
		case "selectTag":
			height = 420;
			break;
		case "novIntro":
			height = 420;
			break;
		case "authorWriteIntro":
			height = 500;
			break;
		case "novCover":
			height = 520;
			break;
		case "authorDetail":
			height = 400;
			break;
		case "editProfile":
			height = 600;
			break;
		case "login":
			height = 370;
			break;
		case "join":
			height = 370;
			break;
		default:
			height = "90vh";
	}
	return height;
};

// 팝업 내용에 따른 모달 색상 변경 모드
const modalColorMode = (popup) => {
  let mode;
  switch (popup) {
    case 'viewComNov':
      mode = true;
      break;
    case 'viewIncomNov':
      mode = true;
      break;
    case 'viewSubNov':
      mode = true;
      break;
    case 'writeNov':
      mode = true;
      break;
    case 'writeSubNov':
      mode = true; 
      break;
    case 'authorWriteNov':
      mode = true;
      break;
    default:
      mode = false;
  }
  return mode;
};

export { idValidation, pwValidation, modalWidth, modalHeight, modalColorMode };