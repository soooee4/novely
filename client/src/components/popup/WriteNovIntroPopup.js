import { useState } from "react";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { Box, styled, Typography } from "@mui/material";
import { CODE, LABEL, COLOR } from "common";

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

	const [description, setDescription] = useState("");

	const inputDescription = (e) => {
		setDescription(e.target.value);
	};

	// 저장 후 다음 버튼 눌렀을 때 NovDetail 페이지에 있는 (서버로 보낼) 상태값에 데이터 세팅
	const subDescHandler = () => {
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
				subDescHandler={subDescHandler}
				changeState={props.changeState}
			/>
			<IntroMsg>
				어떤 매력을 가진 이야기인가요? <br /> 간단하게 소개해주세요 :)
			</IntroMsg>
			<textarea style={writeNovText} onChange={inputDescription} />
		</Wrapper>
	);
};

export default WriteNovIntroPopup;
