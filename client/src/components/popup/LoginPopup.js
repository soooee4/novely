import { Box, Typography, styled } from "@mui/material";

import { COLOR, LABEL, CODE, MESSAGE } from "../../common";

import {  useState } from "react";

// TextField Component
import TextField from "@mui/material/TextField";

// Button Component
import Buttons from "components/controls/Button";

const LoginPopup = (props) => {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);

  //이메일 유효성 검사
  const idValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //비밀번호 유효성검사 (5자 이상 필수)
  const pwValidation = /^.{5,}$/;

// 유효성 검사 함수
  const idValidate = () => {
    if (!idValidation.test(id)) {
      setIdError(true)
    } else {
      setIdError(false)
    }
  }

  const pwValidate = () => {
    if (!pwValidation.test(pw)) {
      setPwError(true)
    } else {
      setPwError(false)
    }
  }


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
		marginTop: -20,
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

	return (
		<>
			<Wrapper>
				<LoginBox>
					<Text fullWidth id="fullWidth" variant="standard" placeholder="ID" />
					<Text fullWidth 
            id="fullWidth" 
            variant="standard" 
            placeholder="PW"
            sx={{
              marginBottom: 7
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
							onClick={props.changeState}
							margin="5px 0 0 0"
						/>
					</Box>
				</LoginBox>
			</Wrapper>
		</>
	);
};

export default LoginPopup;