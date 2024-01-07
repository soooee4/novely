// React Package Module
import { useState } from "react";

// MUI Package Module
import { Box, Typography, styled, TextField } from "@mui/material";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { COLOR, LABEL, CODE, MESSAGE } from "common";

// util
import { idValidation, pwValidation } from "common/util";

// API
import { postData } from "common/communication";
// import { usePostLoginMutation } from "redux/services/AuthService";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
   width: "99%",
   height: "100%",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
  boxSizing: "border-box"
});

// 로그인 전체 영역
const LoginBox = styled(Box)({
   width: 400,

});

const Text = styled(TextField)({
   width: "100%",
   "& .MuiInputBase-input": {
      height: 40,
      fontSize: 17,
   },
});

const SighUpText = styled(Typography)({
   fontSize: 13,
   marginTop: 13,
   marginLeft: 2,
});

/** 로그인 팝업 컴포넌트 (헤더에서 로그인/로그아웃 버튼 클릭 시 해당 팝업 띄워줌) */
const LoginPopup = (props) => {
  
  // 아이디, 비밀번호 유효성 검사 담는 상태
  const [id, setId] = useState("");                 // 입력한 아이디
   const [pw, setPw] = useState("");                 // 입력한 비밀번호
   const [idRegMsg, setIdRegMsg] = useState("");     // 아이디 유효성 검사 미통화 시 띄워주는 에러메세지
   const [pwRegMsg, setPwRegMsg] = useState("");     // 비밀번호 유효성 검사 미통화 시 띄워주는 에러메세지

   // input값 입력
   const inputId = (e) => {
      setId(e.target.value);
   };

   const inputPw = (e) => {
      setPw(e.target.value);
   };

  const validation = (type) => {
     if (type === "id") {
      setIdRegMsg(idValidation(id));
    } else if (type === "pw") {
      setPwRegMsg(pwValidation(pw));
    }
  };

   const onLogin = () => {
      postData("auth/login", {
         login_id: id,
         login_pw: pw,
      })
         .then((data) => {
        if (typeof data === 'object') {
          localStorage.setItem("profile",
            JSON.stringify({
              user_nickname: data.user_nickname,
              user_reg_dv: data.user_reg_dv,
              login_id: data.login_id,
              image: data.image,
              author_first_login: data. author_first_login
            })
          )
          window.location.reload();
        } else if (typeof(data) === 'string') {
          alert(data);
        }
         })
         .catch((err) => {
            console.log(err);
         });
   };

  const enter = (e) => {
    if (e.key === "Enter") onLogin();
  };

   return (
    <Wrapper>
      <LoginBox>
        <Text
          fullWidth
          id="fullWidth"
          variant="standard"
          placeholder="ID"
          onChange={inputId}
          onBlur={() => validation("id")}
          value={id}
          helperText={idRegMsg}
        />
        <Text
          fullWidth
          id="fullWidth"
          variant="standard"
          placeholder="PW"
          onChange={inputPw}
          onBlur={() => validation("pw")}
          value={pw}
          helperText={pwRegMsg}
          type="password"
          sx={{
            marginBottom: 5,
          }}
          onKeyDown={enter}
        />
        <Buttons
          type={CODE.BUTTON.BORDER}
          name={LABEL.BUTTONS.LOGIN}
          backgroundColor={COLOR.WHITE}
          color={COLOR.BLACK}
          width="100%"
          height="40px"
          padding="3px"
          fontSize="21px"
          onSubmit={onLogin}
        />
        <Box sx={{ display: "flex" }}>
          <SighUpText>{MESSAGE.ASK_ACCOUNT}</SighUpText>
          <Buttons
            type={CODE.BUTTON.BASIC}
            name={LABEL.BUTTONS.GOTOSIGNUP}
            backgroundColor={COLOR.WHITE}
            color={COLOR.BLACK}
            fontSize="13px"
            fontWeight="bolder"
            changeState={props.changeState}
            margin="5px 0 0 0"
          />
        </Box>
      </LoginBox>
    </Wrapper>
  );
};

export default LoginPopup;