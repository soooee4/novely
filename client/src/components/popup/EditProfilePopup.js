// // React Package Module
// import { useMemo, useState } from "react";

// // MUI Package Module
// import { Box, styled } from "@mui/material";

// // Constant
// import { MESSAGE, LABEL } from "../../common";

// // TextField Component
// import TextField from "@mui/material/TextField";

// // API Service
// import { patchData } from "common/communication";

// // Util
// import { pwValidation } from "common/util";

// /** STYLE 정의 */
// // 전체 영역
// const Wrapper = styled(Box)({
// 	justifyContent: "center",
// 	alignItems: "center",
// });

// const Text = styled(TextField)({
// 	width: "100%",
// 	"& .MuiInputBase-input": {
// 		height: 20,
// 		fontSize: 12,
// 	},
// });

// /** 내 정보 수정 컴포넌트 (헤더의 내 정보 버튼 클릭 시 해당 팝업 띄워줌)*/
// const EditProfile = (props) => {
// 	// 구조 분해 할당 이용하여 props 분해
// 	const { closeModal, setProfile } = props;
// 	const profile = JSON.parse(localStorage.getItem("profile"));

// 	// Formdata 세팅 데이터 및 유효성 검사 메시지 STATE 정의    
// 	const [newPw, setNewPw] = useState("");                             					// 새 비밀번호
// 	const [curPw, setCurPw] = useState("");                             					// 현재 비밀번호
// 	const [nickname, setNickname] = useState(profile.user_nickname);    					// 로컬스토리지에 저장된 사용자 닉네임
// 	const [img, setImg] = useState();                                   					// 사용자 프로필 이미지
// 	const [confirmNewPwRegMsg, setConfirmNewPwRegMsg] = useState("");   					// 비밀번호 변경 시 새 비밀번호와 새 비밀번호 확인의 값이 다를 경우 띄워주는 에러 메세지
// 	const [pwRegMsg, setPwRegMsg] = useState("");                       					// 비밀번호 유효성 검사 미통과 시 띄워주는 에러 메세지
//   	const [nickNameRegMsg, setNickNameRegMsg] = useState("");           				// 닉네임 유효성 검사 미통과 시 띄워주는 에러 메세지
// 	const [info, setInfo] = useState("");                               					// 작가 소개                  
// 	const [isAuthor, setIsAuthor] = useState(profile.user_reg_dv === "A" ? true : false); 	

// 	// 프로필 이미지 URL
// 	const imageUrl = useMemo(() => {
// 		return `${process.env.REACT_APP_IMAGE_DIRECTORY}/${profile.image}?${Date.now()}`;
// 	}, [profile.image]);

// 	/** Input 입력 */
//   	// 닉네임
// 	const inputNickname = (e) => {
// 		setNickname(e.target.value);
// 	};
//   	// 현재 비밀번호
// 	const inputCurPw = (e) => {
// 		setCurPw(e.target.value);
// 	};
//   	// 새 비밀번호
// 	const inputNewPw = (e) => {
// 		setNewPw(e.target.value);
// 	};
// 	// 작가 소개
// 	const inputInfo = (e) => {
// 		setInfo(e.target.value);
// 	};

// 	// 닉네임 글자수 제한 유효성 검사
// 	const nickNameValidation = /^.{1,12}$/;

// 	// 닉네임 유효성 검사
// 	const nickNameValidate = (e) => {
// 		if (!nickNameValidation.test(e.target.value)) {
// 			setNickNameRegMsg(MESSAGE.ERROR.NICKNAME_INVALIDATION);
// 		} else {
// 			setNickNameRegMsg("");
// 		}
// 	};

// 	// 비밀번호 확인 유효성 검사
// 	const confirmNewPassword = (e) => {
// 		if (e.target.value !== newPw) {
// 			setConfirmNewPwRegMsg(MESSAGE.ERROR.CONFIRM_NEW_PW);
// 		} else {
// 			setConfirmNewPwRegMsg("");
// 		}
// 	};

// 	const validation = () => {
// 		setPwRegMsg(pwValidation(newPw));
// 	};

// 	// 프로필 수정
// 	const onEditProfile = () => {
// 		// 현재 비밀번호 미입력 시
// 		if (curPw === "") {
// 			alert("현재 비밀번호를 입력해야 합니다");
// 			return;
// 		}

// 		// 이미지 파일의 경우 json에 그냥 담는게 아니라 formData 형태로 만들어줘야 하니 formData를 선언하고 그 폼데이터안에 데이터와 이미지 파일 정보를 넣어서 사용
// 		const data = {
// 			login_id: profile.login_id,
// 			user_nickname: nickname,
// 			current_pw: curPw,
// 			new_pw: newPw,
// 			file: img,
// 			author_info: info,
// 			isAuthor: isAuthor,
// 			old_img_name: profile.image,
// 		};

// 		// 폼 데이터 변수 선언
// 		const formData = new FormData();

// 		// data의 각 key값으로 formdata에 데이터 세팅
// 		Object.keys(data).forEach((key) => {
// 			formData.append(key, data[key]);
// 		});

// 		patchData("auth/editProfile", formData).then((data) => {
//       // res.data가 false로 넘어올 경우 경고창 띄워줌
//       if (!data) {
//         alert("현재 비밀번호가 일치하지 않습니다.");
//       } else {
//         // data가 제대로 넘어올 경우
//         // 기존 로컬스토리지에 저장한 profile에 닉네임 추가하여 setProfile 함수를 이용하여 정보 업데이트 후 다시 로컬스토리지에 저장
//         // 스프레드 연산자 사용하여 profile 객체를 분해하여 복사하여 넣음 (데이터 복사, 추가 시 사용)
//         if (typeof data === "object") {
//           const newData = JSON.stringify({
//             ...profile,
//             user_nickname: data.user_nickname,
//             image: data.image_file_name,
//           });
//           localStorage.setItem("profile", newData);
//           // setProfile(newData);
//           alert(MESSAGE.EDIT_SUCCEED);
//           closeModal();
//         } else {
//           alert(data);
//         }
//       }
//     });
// 	};

// 	return (
// 		<Wrapper>
// 			<Box
// 				sx={{
// 					width: 180,
// 					height: 180,
// 					borderRadius: "50%",
// 					margin: "0 auto",
// 					marginTop: 4,
// 					marginBottom: 2,
// 					backgroundImage: `url(${imageUrl})`,
// 					backgroundSize: "cover",
// 				}}
// 			/>
// 			{/* 파일 하나만 선택하도록 할 것이기 때문에 files의 0번째 배열을 직접적으로 가져옴 */}
// 			<input type="file" onChange={(e) => setImg(e.target.files[0])} />
// 			<Text
// 				id="standard-read-only-input"
// 				InputProps={{
// 					readOnly: true,
// 				}}
// 				variant="standard"
// 				placeholder={profile.login_id}
// 			/>
// 			<Text
// 				id="standard-basic"
// 				variant="standard"
// 				defaultValue={profile.user_nickname}
// 				onChange={inputNickname}
// 				onBlur={nickNameValidate}
// 				helperText={nickNameRegMsg !== "" ? nickNameRegMsg : ""}
// 			/>
// 			<Text
// 				id="standard-basic"
// 				variant="standard"
// 				placeholder={LABEL.INPUT.PLACE_HOLDER.CURRENT_PW}
// 				onChange={inputCurPw}
// 				type="password"
// 			/>
// 			<Text
// 				id="standard-basic"
// 				variant="standard"
// 				placeholder={LABEL.INPUT.PLACE_HOLDER.NEW_PW}
// 				onChange={inputNewPw}
// 				type="password"
// 				onBlur={() => validation()}
// 				value={newPw}
// 				helperText={pwRegMsg}
// 			/>
// 			<Text
// 				id="standard-basic"
// 				variant="standard"
// 				placeholder={LABEL.INPUT.PLACE_HOLDER.NEW_PW_REPEAT}
// 				type="password"
// 				onBlur={confirmNewPassword}
// 				helperText={confirmNewPwRegMsg !== "" ? confirmNewPwRegMsg : ""}
// 			/>
// 			<Text
// 				id="standard-basic"
// 				variant="standard"
// 				// defaultValue={profile.user_nickname}
// 				onChange={inputInfo}
// 				// onBlur={nickNameValidate}
// 				// helperText={nickNameRegMsg !== "" ? nickNameRegMsg : ""}
// 			/>
// 			<button type="submit" onClick={onEditProfile}>
// 				{" "}
// 				완료{" "}
// 			</button>
// 		</Wrapper>
// 	);
// };
// export default EditProfile;


// React Package Module
import { useMemo, useState } from "react";

// MUI Package Module
import { Box, styled } from "@mui/material";

// Constant
import { MESSAGE, LABEL } from "../../common";

// TextField Component
import TextField from "@mui/material/TextField";

// API Service
import { patchData } from "common/communication";

// Util
import { pwValidation } from "common/util";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
  justifyContent: "center",
  alignItems: "center",
});

const Text = styled(TextField)({
  width: "100%",
  "& .MuiInputBase-input": {
    height: 20,
    fontSize: 12,
  },
});

/** 내 정보 수정 컴포넌트 (헤더의 내 정보 버튼 클릭 시 해당 팝업 띄워줌)*/
const EditProfile = (props) => {
  // 구조 분해 할당 이용하여 props 분해
  const { closeModal } = props;
  
  // STATE 정의
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")));	// 유저 정보
  const [newPw, setNewPw] = useState(""); 												// 새 비밀번호
  const [curPw, setCurPw] = useState(""); 												// 현재 비밀번호
  const [nickname, setNickname] = useState(profile.user_nickname); 						// 로컬스토리지에 저장된 사용자 닉네임
  const [img, setImg] = useState(); 													// 사용자 프로필 이미지
  const [confirmNewPwRegMsg, setConfirmNewPwRegMsg] = useState(""); 					// 비밀번호 변경 시 새 비밀번호와 새 비밀번호 확인의 값이 다를 경우 띄워주는 에러 메세지
  const [pwRegMsg, setPwRegMsg] = useState(""); 										// 비밀번호 유효성 검사 미통과 시 띄워주는 에러 메세지
  const [nickNameRegMsg, setNickNameRegMsg] = useState(""); 							// 닉네임 유효성 검사 미통과 시 띄워주는 에러 메세지
  const [info, setInfo] = useState(""); 												// 작가 소개
  const [isAuthor, setIsAuthor] = useState(
    profile.user_reg_dv === "W" ? true : false
  );

  // 프로필 이미지 URL
  const imageUrl = useMemo(() => {
    return `${process.env.REACT_APP_IMAGE_DIRECTORY}/${
      profile.image
    }?${Date.now()}`;
  }, [profile.image]);

  console.log(
    `${process.env.REACT_APP_IMAGE_DIRECTORY}/${profile.image}?${Date.now()}`
  );

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

  // 프로필 수정
  const onEditProfile = () => {
    // 현재 비밀번호 미입력 시
    if (curPw === "") {
      alert("현재 비밀번호를 입력해야 합니다");
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

    patchData("auth/editProfile", formData).then((data) => {
      // res.data가 false로 넘어올 경우 경고창 띄워줌
      // data가 제대로 넘어올 경우
      // 기존 로컬스토리지에 저장한 profile에 닉네임 추가하여 setProfile 함수를 이용하여 정보 업데이트 후 다시 로컬스토리지에 저장
      // 스프레드 연산자 사용하여 profile 객체를 분해하여 복사하여 넣음 (데이터 복사, 추가 시 사용)
      if (typeof data === "object") {
        const newData = JSON.stringify({
          ...profile,
          user_nickname: data.user_nickname,
          image: data.image,
        });
        localStorage.setItem("profile", newData);
        setProfile(newData);
        alert(MESSAGE.EDIT_SUCCEED);
        closeModal();
      } else {
        alert(data);
      }
    });
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
        }}
      />
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
      <Text
        id="standard-basic"
        variant="standard"
        // defaultValue={profile.user_nickname}
        onChange={inputInfo}
        // onBlur={nickNameValidate}
        // helperText={nickNameRegMsg !== "" ? nickNameRegMsg : ""}
      />
      <button type="submit" onClick={onEditProfile}>
        {" "}
        완료{" "}
      </button>
    </Wrapper>
  );
};
export default EditProfile;