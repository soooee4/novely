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
	height: "90%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

// 로그인 전체 영역
const LoginBox = styled(Box)({
	width: 400,
	height: 250,
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

	const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const [idRegMsg, setIdRegMsg] = useState("");
	const [pwRegMsg, setPwRegMsg] = useState("");

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
					<Box
						sx={{
							display: "flex",
						}}
					></Box>
				</LoginBox>
			</Wrapper>
		</>
	);
};

export default JoinPopup;
