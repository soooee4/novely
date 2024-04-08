// React Package Module
import { useState } from "react";

// Redux Package Module
import { setModalOpen } from "redux/slice";

// MUI Package Module
import { Box, Typography, styled, TextField } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

// Constant
import { COLOR, LABEL, CODE, MESSAGE } from "common";

// util
import { idValidation, pwValidation } from "common/util";

// API
import { useOnLoginMutation } from "redux/services/AuthService";
import { useDispatch } from "react-redux";

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
const LoginPopup = () => {
	// 아이디, 비밀번호 유효성 검사 담는 상태
	const [id, setId] = useState(""); // 입력한 아이디
	const [pw, setPw] = useState(""); // 입력한 비밀번호
	const [idRegMsg, setIdRegMsg] = useState(""); // 아이디 유효성 검사 미통화 시 띄워주는 에러메세지
	const [pwRegMsg, setPwRegMsg] = useState(""); // 비밀번호 유효성 검사 미통화 시 띄워주는 에러메세지

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

	const dispatch = useDispatch();

	// rtk query
	const [login] = useOnLoginMutation();

	const enter = (e) => {
		if (e.key === "Enter") login({ login_id: id, login_pw: pw });
	};
	const onClick = async () => {
		await login({ login_id: id, login_pw: pw });
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
					onClick={onClick}
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
						setModalOpen={() =>
							dispatch(
								setModalOpen({
									open: true,
									content: "join",
									width: 550,
									height: 340,
								})
							)
						}
						margin="5px 0 0 0"
					/>
				</Box>
			</LoginBox>
		</Wrapper>
	);
};

export default LoginPopup;
