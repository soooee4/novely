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

export { idValidation, pwValidation };