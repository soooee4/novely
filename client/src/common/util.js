// Library
import imageCompression from 'browser-image-compression';

// Common
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
			width = 480;
			break;
		case "authorDetail":
			width = "85%";
			break;
		case "editProfile":
			width = 400;
			break;
		case "login":
			width = 550;
			break;
		case "join":
			width = 550;
			break;
    case "authorFirstLogin":
			width = 500;
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
			height = 340;
			break;
		case "join":
			height = 340;
			break;
		case "authorFirstLogin":
			height = 340;
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

// 파일 이미지 압축 함수
const compressImage = async (img) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 870,
  };

  try {
    const compressedBlob = await imageCompression(img, options);

    // 리사이징한 Blob 데이터를 File 형태로 변환
    const resizingFile = new File([compressedBlob], img.name, {
      type: img.type,
    });

    // 리사이징된 File 형태의 이미지 리턴
    return resizingFile;
  } catch (error) {
    console.log(error);
  }
};

// 소설 마감 기한 알려주는 디데이 카운터 함수
const novelDdayCounter = (created_date, complete_seqno) => {
  // 문자열로 뽑히는 created_date를 Date 객체로 변환
  const createdDate = new Date(created_date);

  // 마감일은 소설의 작성일 기준 30일 후로 설정
  const dueDate = new Date(createdDate.setDate(createdDate.getDate() + 30));

  // 현재 시간(PC 설정 관계없이 서울 시간으로 고정)
  const krCurr = new Date(
    new Date().getTime() +
      new Date().getTimezoneOffset() * 60 * 1000 +
      9 * 60 * 60 * 1000
  );

  // 현재 날짜와 마감일의 차이를 밀리초 단위로 변환하여 계산
  let leftTime = dueDate.getTime() - krCurr.getTime();

  // 밀리초를 일 단위로 변환
  let leftDay = Math.ceil(leftTime / (1000 * 60 * 60 * 24)); // 1초 = 1000밀리초, 1분은 60초, 1시간은 60분, 1일은 24시간

  if (leftDay === 0) {
    return MESSAGE.D_DAY;
  } else if (leftDay < 0 || complete_seqno) {
    return MESSAGE.DDAY_COMPLETE;
  } else {
    return MESSAGE.DDAY_COUNT + leftDay;
  }
};

export {
  idValidation,
  pwValidation,
  modalWidth,
  modalHeight,
  modalColorMode,
  compressImage,
  novelDdayCounter
};