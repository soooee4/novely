import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import { Box, Typography, styled } from "@mui/material";
import { COLOR, LABEL, CODE, MESSAGE } from "../../common";

// TextField Component
import TextField from "@mui/material/TextField";

// Button Component
import Buttons from "components/controls/Button";

import { getData } from "common/communication";

// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	// display: "flex",
	justifyContent: "center",
	alignItems: "center",
	border: "2px solid skyblue",
});

const Text = styled(TextField)({
	width: "100%",
	"& .MuiInputBase-input": {
		height: 20,
		fontSize: 12,
	},
});

const EditProfile = (props) => {
	// const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const [nickname, setNickname] = useState("");
	// const [pwRegMsg, setPwRegMsg] = useState("");

	// input값 입력
	const inputNickname = (e) => {
		setNickname(e.target.value);
	};

	const inputPw = (e) => {
		setPw(e.target.value);
	};

	const profile = JSON.parse(localStorage.getItem("profile"));
	// console.log(profile.user_nickname,444);


	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.patch(`http://localhost:8080/api/auth/editProfile`, {
				login_id: profile.id,
				user_nickname: nickname,
				login_pw: pw,
        
			})
 
			.then(function (res) {
        console.log(res,6161);
				// console.log(res.data.length, 787878);
				// if(res.data)
			});
	};
	// console.log(response);

	return (
		<>
      <form onSubmit={handleSubmit}>
			<Wrapper>
				<Text
					// fullWidth
					id="standard-read-only-input"
					InputProps={{
						readOnly: true,
					}}
					variant="standard"
					placeholder={profile.id}
					// 함수 호출할 때 파라미터 있을 경우에 화살표 함수 형태
					// onChange={inputId}
					// onBlur={idValidate}
					// value={id}
					// helperText={idRegMsg !== "" ? idRegMsg : ""}
				/>
				<Text
					// fullWidth
					id="standard-basic"
					variant="standard"
					defaultValue={profile.user_nickname}
					onChange={inputNickname}
					// onBlur={pwValidate}
					// value={pw}
					// type="password"
					// sx={{
					//   marginBottom: 5,
					// }}
					// helperText={pwRegMsg !== "" ? pwRegMsg : ""}
				/>
				<Text
					// fullWidth
					id="standard-basic"
					variant="standard"
					placeholder="현재 비밀번호"
					// onChange={inputPw}
					// onBlur={pwValidate}
					// value={pw}
					type="password"
					// sx={{
					//   marginBottom: 5,
					// }}
					// helperText={pwRegMsg !== "" ? pwRegMsg : ""}
				/>
				<Text
					// fullWidth
					id="standard-basic"
					variant="standard"
					placeholder="새 비밀번호"
					onChange={inputPw}
					// onBlur={pwValidate}
					// value={pw}
					type="password"
					// sx={{
					//   marginBottom: 5,
					// }}
					// helperText={pwRegMsg !== "" ? pwRegMsg : ""}
				/>
				<Text
					// fullWidth
					id="standard-basic"
					variant="standard"
					placeholder="새 비밀번호 확인"
					// onChange={inputPw}
					// onBlur={pwValidate}
					// value={pw}
					type="password"
					// sx={{
					//   marginBottom: 5,
					// }}
					// helperText={pwRegMsg !== "" ? pwRegMsg : ""}
				/>
				<button type="submit" onClick={handleSubmit}>
					{" "}
					완료{" "}
				</button>
			</Wrapper>
      </form>
		</>
	);
};
export default EditProfile;
