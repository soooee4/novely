import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import { Box, Typography, styled } from "@mui/material";
import { COLOR, LABEL, CODE, MESSAGE } from "../../common";

// TextField Component
import TextField from "@mui/material/TextField";

// Button Component
import Buttons from "components/controls/Button";

import { postData } from "common/communication";

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

const SighUpText = styled(Typography)({
	fontSize: 9,
	marginTop: 13,
	marginLeft: 2,
});


//LoginPopup 컴포넌트 -----
const LoginPopup = (props) => {
  // console.log(props);
  const { changeState, closeModal, id, idRegMsg, idValidate, isLogin, pw, pwRegMsg, pwValidate, setId, setIdRegMsg, setPw, setPwRegMsg  } = props;


	// input값 입력
	const inputId = (e) => {
		setId(e.target.value);
	};

	const inputPw = (e) => {
		setPw(e.target.value);
	};

	// console.log(id, 11);

	const onLogin = () => {
		// console.log(props,33)

		postData("auth/login", {
			login_id: id,
			login_pw: pw,
		})
			.then((data) => {
				// console.log(data,999)
				// data.id = id;
				localStorage.setItem(
					"profile",
					JSON.stringify({
						user_nickname: data.user_nickname,
						user_reg_dv: data.user_reg_dv,
            login_id: data.login_id
					})
				);
				// console.log(data,10004);
				// localStorage.setItem("profile", data);

				window.location.reload();
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
						// 함수 호출할 때 파라미터 있을 경우에 화살표 함수 형태
						onChange={inputId}
						// onBlur={idValidate}
            onBlur={idValidate}
						value={id}
						helperText={idRegMsg !== "" ? idRegMsg : ""}
					/>
					<Text
						fullWidth
						id="fullWidth"
						variant="standard"
						placeholder="PW"
						onChange={inputPw}
						onBlur={pwValidate}
						value={pw}
            helperText={pwRegMsg !== "" ? pwRegMsg : ""}
						type="password"
						sx={{
							marginBottom: 5,
						}}
					/>
					<Buttons
						type={CODE.BUTTON.BORDER}
						name={LABEL.BUTTONS.LOGIN}
						backgroundColor={COLOR.WHITE}
						color={COLOR.BLACK}
						width="100%"
						height="40px"
						padding="3px"
						fontSize="20px"
						onSubmit={onLogin}
					/>
					<Box
						sx={{
							display: "flex",
						}}
					>
						<SighUpText>{MESSAGE.ASK_ACCOUNT}</SighUpText>
						<Buttons
							type={CODE.BUTTON.BASIC}
							name={LABEL.BUTTONS.GOTOSIGNUP}
							backgroundColor={COLOR.WHITE}
							color={COLOR.BLACK}
							fontSize="8px"
							fontWeight="bolder"
							changeState={changeState}
							margin="5px 0 0 0"
						/>
					</Box>
				</LoginBox>
			</Wrapper>
		</>
	);
};

export default LoginPopup;
