// React Package Module
import { useState } from "react";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";

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

/** 서브 소설 작성 후 소설 설명을 작성하는 컴포넌트 */
const WriteNovIntroPopup = (props) => {

	const [description, setDescription] = useState("");     // 서브 소설 설명

	const inputDescription = (e) => {
		setDescription(e.target.value);
	};

	// 저장 후 다음 버튼 눌렀을 때 NovDetail 페이지에 있는 (서버로 보낼) 상태값에 데이터 세팅
	const postSubDesc = () => {
		props.setDescription({
			description: description,
		});
	};

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={COLOR.BLACK}
				name={LABEL.BUTTONS.GOTONEXT}
				margin={"-10px -5px 0px auto"}
				postSubDesc={postSubDesc}
				changeState={props.changeState}
			/>
			<IntroMsg>{MESSAGE.WRITE_MAIN_NOVEL_INTRO}</IntroMsg>
			<textarea style={writeNovText} onChange={inputDescription} />
		</Wrapper>
	);
};

export default WriteNovIntroPopup;
