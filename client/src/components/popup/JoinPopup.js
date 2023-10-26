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


const JoinPopup = (props) => {

  console.log(props)
  const { id, idRegMsg, idValidate, profile, pw, pwRegMsg, pwValidate, setId, setIdRegMsg, setProfile, setPw, setPwRegMsg  } = props;

	// input값 입력
	const inputId = (e) => {
		setId(e.target.value);
	};

	const inputPw = (e) => {
		setPw(e.target.value);
	};


	const onJoin = () => {


		postData('auth/join', {
			login_id: id,
			login_pw: pw,
		})
    .then((data) => {
        console.log(data,5555)

        if (typeof(data) === 'string') {
          alert('이미 가입된 정보입니다.')
        } else if (typeof(data) === 'object') {
          console.log(data,22)
          localStorage.setItem("profile", JSON.stringify(data));
          alert("회원가입 완료!")
          window.location.reload();
        }
    })
    .catch((err) => {
      console.log(err);
    })
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
						type="password"
						sx={{
							marginBottom: 5,
						}}
						helperText={pwRegMsg !== "" ? pwRegMsg : ""}
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
					>
					</Box>
				</LoginBox>
			</Wrapper>
		</>
	);
};

export default JoinPopup;
