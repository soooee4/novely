// React Package Module
import { useState } from "react";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen, setPostNovelData } from "redux/slice";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",

	paddingBottom: 20,
});

//textarea 영역
const writeNovText = (color) => {
	return {
		fontFamily: "'Pretendard-Regular', sans-serif",
		width: "100%",
		height: "100%",
		boxSizing: "borderBox",
		resize: "none",
		outline: "none",
		borderRadius: 10,
		padding: 10,
		fontSize: 17,
		boxSizing: "border-box",
		backgroundColor: color,
		color: color === "#121212" ? "white" : "black",
	};
};

const IntroMsg = styled(Typography)({
	fontSize: 18,
	fontWeight: "bolder",
	textAlign: "center",
	marginBottom: 30,
});

/** 서브 소설 작성 후 소설 설명을 작성하는 컴포넌트 */
const WriteNovIntroPopup = () => {
	// redux state
	const color = useSelector((state) => state.main.color);

	const [description, setDescription] = useState(""); // 서브 소설 설명

	const inputDescription = (e) => {
		setDescription(e.target.value);
	};

	const dispatch = useDispatch();

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
				name={LABEL.BUTTONS.GOTONEXT}
				margin={"5px 20px 5px auto"}
				onClick={() => {
					// 사용자가 소설 설명을 입력하지 않았다면 경고창 띄워줌
					if (description.trim().length === 0) {
						alert(MESSAGE.ERROR.WRITE_DESCRIPTION); //
					} else {
						dispatch(
							setModalOpen({
								open: true,
								content: "novCover",
								width: 480,
								height: 520,
							})
						);
						dispatch(setPostNovelData({ description: description }));
					}
				}}
			/>
			<IntroMsg>{MESSAGE.WRITE_MAIN_NOVEL_INTRO}</IntroMsg>
			<textarea style={writeNovText(color)} onChange={inputDescription} />
		</Wrapper>
	);
};

export default WriteNovIntroPopup;