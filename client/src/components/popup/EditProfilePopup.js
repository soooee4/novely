import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import { Box, Typography, styled } from "@mui/material";
import { COLOR, LABEL, CODE, MESSAGE } from "../../common";

// TextField Component
import TextField from "@mui/material/TextField";

// Button Component
import Buttons from "components/controls/Button";

import { patchData } from "common/communication";

import { pwValidation } from "common/util";

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
  // 구조 분해 할당 이용하여 props 분해
  const { closeModal, id, idValidate, profile, pwValidate, setProfile } = props;

  const [newPw, setNewPw] = useState("");
  const [curPw, setCurPw] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmNewPwRegMsg, setConfirmNewPwRegMsg] = useState("");
  const [idRegMsg, setIdRegMsg] = useState("");
  const [pwRegMsg, setPwRegMsg] = useState("");

  // 이미지 파일 state
  const [img, setImg] = useState();

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

  const validation = () => {
    setPwRegMsg(pwValidation(newPw));
  };

  const onEditProfile = () => {
    // 이미지 파일의 경우 json에 그냥 담는게 아니라 formData 형태로 만들어줘야 하니 formData를 선언하고 그 폼데이터안에 데이터와 이미지 파일 정보를 넣어서 사용
    const data = {
      login_id: profile.login_id,
      user_nickname: nickname,
      current_pw: curPw,
      new_pw: newPw,
      img: img,
    };

    // 폼 데이터 변수 선언
    const formData = new FormData();

    Object.keys(data).forEach((key) => {// // json 형태로 된 text 데이터일 경우(stringfy 내장 메서드로 JSON에서 벗겨내준 후 formData로 추가)
		if (data[key] && typeof data[key] === 'object') {
			// 이미지 데이터일 경우
    		formData.append(key, JSON.stringify(data[key]));
    	} else { 
    		// 텍스트 데이터일 경우
    		formData.append(key, data[key]);
    	}
    });
    
    patchData("auth/editProfile", formData)

	.then((data) => {
      // res.data가 false로 넘어올 경우 경고창 띄워줌
      if (!data) {
        alert("현재 비밀번호가 일치하지 않습니다.");
      } else {
        // data가 제대로 넘어올 경우
        // 기존 로컬스토리지에 저장한 profile에 닉네임 추가하여 setProfile 함수를 이용하여 정보 업데이트 후 다시 로컬스토리지에 저장
        // 스프레드 연산자 사용하여 profile 객체를 분해하여 복사하여 넣음 (데이터 복사, 추가 시 사용)
        if (typeof data === "object") {
          const newData = JSON.stringify({
            ...profile,
            user_nickname: data.user_nickname,
          });
          localStorage.setItem("profile", newData);
          setProfile(newData);
          alert("수정 완료 :)");
          closeModal();
        } else {
          alert(data);
        }
      }
    });
  };

  return (
    <Wrapper>
      {/* 파일 하나만 선택하도록 할 것이기 때문에 files의 0번째 배열을 직접적으로 가져옴 */}
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
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
        onBlur={() => validation()}
        value={newPw}
        helperText={pwRegMsg}
      />
      <Text
        id="standard-basic"
        variant="standard"
        placeholder="새 비밀번호 확인"
        type="password"
        onBlur={confirmNewPassword}
        helperText={confirmNewPwRegMsg !== "" ? confirmNewPwRegMsg : ""}
      />
      <button type="submit" onClick={onEditProfile}>
        {" "}
        완료{" "}
      </button>
    </Wrapper>
  );
};
export default EditProfile;