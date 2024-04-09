// React Package Module
import { useMemo, useState, useRef, useEffect } from "react";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux";
import { setToastOpen } from "redux/slice";

// MUI Package Module
import { Box, styled } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

// Constant
import { MESSAGE, LABEL, CODE } from "../../common";

// TextField Component
import TextField from "@mui/material/TextField";

// API Service
import { useEditProfileMutation } from "redux/services/AuthService";

// Util
import { pwValidation } from "common/util";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 20px 20px 20px"
});

const Text = styled(TextField)({
  width: "100%",
  "& .MuiInputBase-input": {
    height: 20,
    fontSize: 14,
    marginTop: 8
  },
});

const ButtonBox = styled(Box)({
  width: "100%",
  display: 'flex',
  justifyContent: 'flex-end',
});

const fileUploaderBtn =  {
  backgroundColor: "white",
  color: "black",
  border: "none", 
  cursor: "pointer",
  display: "block",
  margin: "0 auto",
  fontSize: 15
};

/** 내 정보 수정 컴포넌트 (헤더의 내 정보 버튼 클릭 시 해당 팝업 띄워줌)*/
const EditProfile = () => {

  const profile = useSelector((state) => state.main.profile);
  
  // STATE 정의
  const [newPw, setNewPw] = useState(""); // 새 비밀번호
  const [curPw, setCurPw] = useState(""); // 현재 비밀번호
  const [nickname, setNickname] = useState(profile.user_nickname); // 로컬스토리지에 저장된 사용자 닉네임
  const [img, setImg] = useState(); // 사용자 프로필 이미지
  const [confirmNewPwRegMsg, setConfirmNewPwRegMsg] = useState(""); // 비밀번호 변경 시 새 비밀번호와 새 비밀번호 확인의 값이 다를 경우 띄워주는 에러 메세지
  const [pwRegMsg, setPwRegMsg] = useState(""); // 비밀번호 유효성 검사 미통과 시 띄워주는 에러 메세지
  const [nickNameRegMsg, setNickNameRegMsg] = useState(""); // 닉네임 유효성 검사 미통과 시 띄워주는 에러 메세지
  const [info, setInfo] = useState(""); // 작가 소개
  const [isAuthor, setIsAuthor] = useState(profile.user_reg_dv === "W" ? true : false);
  const [selectedFileName, setSelectedFileName] = useState(""); // 사용자가 선택한 프로필 사진 이름
  const [previewUrl, setPreviewUrl] = useState("");
  
  // rtk query
  const [editProfile] = useEditProfileMutation();

  const imageUrl = useMemo(() => {
	if (previewUrl !== "") {
		return previewUrl;
	} else {
		return `${process.env.REACT_APP_IMAGE_DIRECTORY}/${profile.image}?${Date.now()}`;
	}
  }, [profile.image, previewUrl]);

  /** Input 입력 */
  // 닉네임
  const inputNickname = (e) => {
    setNickname(e.target.value);
  };
  // 현재 비밀번호
  const inputCurPw = (e) => {
    setCurPw(e.target.value);
  };
  // 새 비밀번호
  const inputNewPw = (e) => {
    setNewPw(e.target.value);
  };
  // 작가 소개
  const inputInfo = (e) => {
    setInfo(e.target.value);
  };

  // 닉네임 글자수 제한 유효성 검사
  const nickNameValidation = /^.{1,12}$/;

  // 닉네임 유효성 검사
  const nickNameValidate = (e) => {
    if (!nickNameValidation.test(e.target.value)) {
      setNickNameRegMsg(MESSAGE.ERROR.NICKNAME_INVALIDATION);
    } else {
      setNickNameRegMsg("");
    }
  };

  // 비밀번호 확인 유효성 검사
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

  const dispatch = useDispatch();

  // 프로필 수정
  const onClick = async () => {
		// 현재 비밀번호 미입력 시
		if (curPw === "") {
      dispatch(
				setToastOpen({
					open: true,
					type: "warning",
					message: MESSAGE.WRITE_CUR_PW,
				})
			);
			return;
		} else if (info.length > 50) {
      dispatch(
				setToastOpen({
					open: true,
					type: "warning",
					message: MESSAGE.ERROR.INFO_INVALIDATION,
				})
			);
      return;
    }

		// 이미지 파일의 경우 json에 그냥 담는게 아니라 formData 형태로 만들어줘야 하니 formData를 선언하고 그 폼데이터안에 데이터와 이미지 파일 정보를 넣어서 사용
		const data = {
			login_id: profile.login_id,
			user_nickname: nickname,
			current_pw: curPw,
			new_pw: newPw,
			file: img,
			author_info: info,
			isAuthor: isAuthor,
			old_img_name: profile.image,
		};

		// 폼 데이터 변수 선언
		const formData = new FormData();

		// data의 각 key값으로 formdata에 데이터 세팅
		Object.keys(data).forEach((key) => {
			formData.append(key, data[key]);
		});

    await editProfile(formData);
	};

  // 파일 업로드 하는 input에 대한 참조를 저장하는 변수 (현재 참조 대상이 없음을 나타내기 위해 초기값 null로 세팅)
  const fileInputRef = useRef(null);

  // 파일 업로드 하는 input 클릭 했을 때 기능 함수 (현재 참조하는 요소 클릭하도록)
  const fileUploadBtn = () => {
    fileInputRef.current.click();
  }

  const fileChange = (e) => {
	const file = e.target.files[0];
	setImg(file);
    setSelectedFileName(file.name); // 선택한 파일명 업데이트

	if (file) {
		const reader = new FileReader();
		reader.onloadend = () => {
			setPreviewUrl(reader.result);
		};
		reader.readAsDataURL(file);
	}
  };

  return (
    <Wrapper>
      <Box
        sx={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          margin: "0 auto",
          marginTop: 4,
          marginBottom: 2,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* 파일 하나만 선택하도록 할 것이기 때문에 files의 0번째 배열을 직접적으로 가져옴 */}
      {/* input 태그 내장 매서드 사용하여 확장자 제한 */}
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        onChange={(e) => fileChange(e)}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      {/* 사용자가 선택한 파일명 */}
      {selectedFileName && (
        <p style={{ fontSize: 12, textAlign: "center", margin: "0 auto" }}>
          {selectedFileName}
        </p>
      )}
      {/* 커스텀한 파일 업로더 버튼 */}
      <button onClick={fileUploadBtn} style={fileUploaderBtn}>
        {LABEL.BUTTONS.UPLOAD_IMAGE}
      </button>

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
        placeholder={LABEL.INPUT.PLACE_HOLDER.CURRENT_PW}
        onChange={inputCurPw}
        type="password"
      />
      <Text
        id="standard-basic"
        variant="standard"
        placeholder={LABEL.INPUT.PLACE_HOLDER.NEW_PW}
        onChange={inputNewPw}
        type="password"
        onBlur={() => validation()}
        value={newPw}
        helperText={pwRegMsg}
      />
      <Text
        id="standard-basic"
        variant="standard"
        placeholder={LABEL.INPUT.PLACE_HOLDER.NEW_PW_REPEAT}
        type="password"
        onBlur={confirmNewPassword}
        helperText={confirmNewPwRegMsg !== "" ? confirmNewPwRegMsg : ""}
      />
      {profile.user_reg_dv === "W" && (
        <Text
          id="standard-basic"
          variant="standard"
          defaultValue={profile.author_info}
          onChange={inputInfo}
        />
      )}
      <ButtonBox>
        <Buttons
          type={CODE.BUTTON.BASIC}
          name={LABEL.BUTTONS.SUBMIT}
          onClick={onClick}
          margin={"10px 0 0 auto"}
        />
      </ButtonBox>
    </Wrapper>
  );
};
export default EditProfile;