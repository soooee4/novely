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
	console.log(props);
	// 구조 분해 할당 이용하여 props 분해
	const {
		closeModal,
		id,
		idRegMsg,
		idValidate,
		profile,
		pw,
		pwRegMsg,
		pwValidate,
		setId,
		setIdRegMsg,
		setProfile,
		setPw,
		setPwRegMsg,
	} = props;

	console.log(props, 33434);
	// const [id, setId] = useState("");
	const [newPw, setNewPw] = useState("");
	const [curPw, setCurPw] = useState("");
	const [nickname, setNickname] = useState("");
	const [confirmNewPwRegMsg, setConfirmNewPwRegMsg] = useState("");

	// const [pwRegMsg, setPwRegMsg] = useState("");
	// console.log(newPw, curPw, nickname, 333);

	// input값 입력
	const inputNickname = (e) => {
		setNickname(e.target.value);
	};

	const inputCurPw = (e) => {
		setCurPw(e.target.value);
	};

	const inputNewPw = (e) => {
		setNewPw(e.target.value);
	};

	// const inputConfirmNewPw = (e) => {
	// 	setConfirmNewPw(e.target.value);
	// };

	// 닉네임 글자수 제한 유효성 검사
	const nickNameValidation = /^.{1,12}$/;
	const [nickNameRegMsg, setNickNameRegMsg] = useState("");

	// 닉네임 유효성 검사 함수
	const nickNameValidate = (e) => {
		if (!nickNameValidation.test(e.target.value)) {
			setNickNameRegMsg(MESSAGE.ERROR.NICKNAME_INVALIDATION);
		} else {
			setNickNameRegMsg("");
		}
	};

	// 비밀번호 확인 유효성 검사 함수
	const confirmNewPassword = (e) => {
		if (e.target.value !== newPw) {
			setConfirmNewPwRegMsg(MESSAGE.ERROR.CONFIRM_NEW_PW);
		} else {
			setConfirmNewPwRegMsg("");
		}
	};

	// const profile = JSON.parse(localStorage.getItem("profile"));
	// console.log(profile.user_nickname,444);

	const handleSubmit = (e) => {
		e.preventDefault();

		// ? 비밀번호만 변경할 경우 닉네임이 공백으로 들어가는 것을 막기 위한 코드인데 왜 작동 안하는지? (서비스 113 참고)
		// let user_nickname = nickname;
		// if (!user_nickname) {
		//   user_nickname = profile.user_nickname;
		// }

		axios
			.patch(`http://localhost:8080/api/auth/editProfile`, {
				login_id: profile.login_id,
				user_nickname: nickname,
				current_pw: curPw,
				new_pw: newPw,
			})
			.then(function (res) {
				// res.data가 false로 넘어올 경우 경고창 띄워줌
				console.log(res.data, 999099);
				if (!res.data) {
					alert("현재 비밀번호가 일치하지 않습니다.");
				} else {
					// data가 제대로 넘어올 경우
					// 기존 로컬스토리지에 저장한 profile에 닉네임 추가하여 setProfile 함수를 이용하여 정보 업데이트 후 다시 로컬스토리지에 저장
					console.log(res.data, 6161);
					// 스프레드 연산자 사용하여 profile 객체를 분해하여 복사하여 넣음 (데이터 복사, 추가 시 사용)
					const newData = JSON.stringify({
						...profile,
						user_nickname: res.data,
					});
					setProfile(newData);
					localStorage.setItem("profile", newData);
					alert("수정 완료!");
					closeModal();
				}

				// console.log(res.data.length, 787878);
				// if(res.data)
			});
	};
	// console.log(response);

	return (
		<>
			<Wrapper>
				<form method="post" action="/upload" enctype="multipart/form-data">
					<input type="text" name="subject" />
					<input type="file" />
					<button type="submit">이미지 업로드</button>
				</form>
				<Text
					id="standard-read-only-input"
					InputProps={{
						readOnly: true,
					}}
					variant="standard"
					placeholder={profile.login_id}
				/>
				<Text
					id="standard-basic"
					variant="standard"
					defaultValue={profile.user_nickname}
					onChange={inputNickname}
					onBlur={nickNameValidate}
					helperText={nickNameRegMsg !== "" ? nickNameRegMsg : ""}
				/>
				<Text
					id="standard-basic"
					variant="standard"
					placeholder="현재 비밀번호 (필수값)"
					onChange={inputCurPw}
					type="password"
				/>
				<Text
					id="standard-basic"
					variant="standard"
					placeholder="새 비밀번호"
					onChange={inputNewPw}
					type="password"
					onBlur={pwValidate}
					value={newPw}
					helperText={pwRegMsg !== "" ? pwRegMsg : ""}
				/>
				<Text
					id="standard-basic"
					variant="standard"
					placeholder="새 비밀번호 확인"
					type="password"
					onBlur={confirmNewPassword}
					helperText={confirmNewPwRegMsg !== "" ? confirmNewPwRegMsg : ""}
				/>
				<button type="submit" onClick={handleSubmit}>
					{" "}
					완료{" "}
				</button>
			</Wrapper>
		</>
	);
};
export default EditProfile;
