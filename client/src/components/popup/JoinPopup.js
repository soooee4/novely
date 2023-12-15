// React Package Module
import { useState } from "react";

// MUI Package Module
import { Box, styled, TextField } from "@mui/material";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { COLOR, LABEL, CODE, MESSAGE } from "common";

// util
import { idValidation, pwValidation } from "common/util";

// API
import { postData } from "common/communication";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "99%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
  boxSizing: "border-box",
});

// 로그인 전체 영역
const LoginBox = styled(Box)({
	width: 400,
  marginTop: -39
});

const Text = styled(TextField)({
	width: "100%",
	"& .MuiInputBase-input": {
		height: 40,
		fontSize: 17,
	},
});

/** 회원가입 팝업 컴포넌트 (로그인 컴포넌트 내 회원가입 버튼 클릭 시 해당 팝업 띄워줌) */
const JoinPopup = () => {

	const [id, setId] = useState("");               // 입력한 아이디
	const [pw, setPw] = useState("");               // 입력한 비밀번호
	const [idRegMsg, setIdRegMsg] = useState("");   // 아이디 유효성 검사 미통화 시 띄워주는 에러메세지
	const [pwRegMsg, setPwRegMsg] = useState("");   // 비밀번호 유효성 검사 미통화 시 띄워주는 에러메세지

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

	const onJoin = () => {

    // 유효성 검사 통과 못하거나 입력한 id, pw값이 없으면 경고 메세지 띄워주고 함수 종료
    if (idRegMsg !== '' || pwRegMsg !== '' || id == '' || pw == '') {
      alert(MESSAGE.ERROR.CHECK_JOIN_INFO);
      return;
    }
		postData("auth/join", {
			login_id: id,
			login_pw: pw,
		})
			.then((data) => {
				if (typeof data === "string") {
					alert(MESSAGE.ERROR.EXIST_USER);
				} else if (typeof data === "object") {
					localStorage.setItem("profile", JSON.stringify(data));
					alert(MESSAGE.JOINED);
					window.location.reload();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

  const enter = (e) => {
    if (e.key === "Enter") onJoin();
  };


	return (
		<>
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
						type="password"
						sx={{
							marginBottom: 5,
						}}
						helperText={pwRegMsg}
            onKeyDown={enter}
					/>
					<Buttons
						type={CODE.BUTTON.BORDER}
						name={LABEL.BUTTONS.JOIN_BTN}
						backgroundColor={COLOR.WHITE}
						color={COLOR.BLACK}
						width="100%"
						height="40px"
						padding="3px"
						fontSize="20px"
						onSubmit={onJoin}
					/>
				</LoginBox>
			</Wrapper>
		</>
	);
};

export default JoinPopup;
