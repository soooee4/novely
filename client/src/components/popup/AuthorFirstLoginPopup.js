// React Package Module
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux";
import { setToastOpen } from "redux/slice";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";

// API Service
import { patchData } from "common/communication";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
	marinTop: "-30px",
});

//textarea 영역
const writeNovText = {
	width: "100%",
	height: "80%",
	resize: "none",
	outline: "none",
	borderRadius: 10,
	padding: 20,
	fontSize: 15,
	boxSizing: "border-box",
	marginBottom: 20,
};

const IntroMsg = styled(Typography)({
	fontSize: 18,
	fontWeight: "bolder",
	textAlign: "center",
	marginBottom: 30,
});

/** 작가로 승급 후 처음으로 로그인 시 띄워지는 작가 소갯말 세팅 컴포넌트 */
const AuthorFirstLoginPopup = (props) => {

	const profile = useSelector((state) => state.main.profile);

	const [authorInfo, setAuthorInfo] = useState(""); // 작가 소갯말
	const inputAuthorInfo = (e) => {
		setAuthorInfo(e.target.value);
	};

  const dispatch = useDispatch();

	// 저장 후 다음 버튼 눌렀을 때 Main 페이지에 있는 (서버로 보낼) 상태값에 데이터 세팅
	const patchAuthorInfo = () => {
		if (authorInfo.length > 50) {
      dispatch(setToastOpen({
        open: true, type: 'error', message: MESSAGE.ERROR.INFO_INVALIDATION
      }))
			return;
		}

		patchData("auth/patchFirstAuthor", {
			authorInfo: authorInfo,
			login_id: profile.login_id,
		})
			.then((data) => {
				if (typeof data === "object") {
					localStorage.setItem(
						"profile",
						JSON.stringify({
							...props.profile,
							author_first_login: data.author_first_login,
							author_info: data.author_info,
						})
					);
          dispatch(setToastOpen({
            open: true, type: 'sucess', message: MESSAGE.AUTHOR_REGISTER_SUCCESS
          }))
					window.location.reload();
				} else if (typeof data === "string") {
          dispatch(
            setToastOpen({
              open: true,
              type: "error",
              message: data,
            })
          );
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={COLOR.BLACK}
				name={LABEL.BUTTONS.SUBMIT}
				margin={"-10px -5px 0px auto"}
				patchAuthorInfo={patchAuthorInfo}
				changeState={props.changeState}
			/>
			<IntroMsg>{MESSAGE.AUTHOR_FIRST_LOGIN}</IntroMsg>
			<textarea
				style={writeNovText}
				onChange={inputAuthorInfo}
				maxLength={100}
				placeholder={MESSAGE.ERROR.INFO_INVALIDATION}
			/>
		</Wrapper>
	);
};

export default AuthorFirstLoginPopup;
