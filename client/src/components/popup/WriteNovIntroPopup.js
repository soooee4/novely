// React Package Module
import { useState } from "react";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

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
	// paddingTop: 40,
  paddingBottom: 20,
  //  boxShadow: "inset 0 0 3px 3px blue"

});

//textarea 영역
const writeNovText = (color) => {
  return (
    {
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
      color: color === "#121212" ? "white" : "black"
    }
  )
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
		if (description.length === 0) {
			alert(MESSAGE.ERROR.WRITE_DESCRIPTION);
			return;
		} else if (description.length > 100) {
			alert(MESSAGE.ERROR.INFO_INVALIDATION);
			return;
		} else {
			props.setDescription({
				description: description,
			});
			// return;
		}
	};

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={props.color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
				name={LABEL.BUTTONS.GOTONEXT}
				margin={"5px 20px 5px auto"}
				postSubDesc={postSubDesc}
				changeState={description.length !== 0 && description.length < 100 && props.changeState}
			/>
			<IntroMsg>{MESSAGE.WRITE_MAIN_NOVEL_INTRO}</IntroMsg>
			<textarea 
				style={writeNovText(props.color)} 
				onChange={inputDescription} 
      />
		</Wrapper>
	);
};

export default WriteNovIntroPopup;