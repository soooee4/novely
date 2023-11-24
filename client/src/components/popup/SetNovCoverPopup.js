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
	boxSizing: "border-box",
});

const ImgBox = styled(Box)({
	width: "100%",
	height: 500,
	boxSizing: "border-box",
	marginBottom: 5,
	display: "flex",
	flexDirection: "column",
});

const CoverImg = styled(Box)({
	width: 270,
	height: 320,
	display: "flex",
	flexDirection: "column",
	boxSizing: "border-box",
	backgroundColor: COLOR.GREEN_TEA,
	margin: "8px auto",
	borderRadius: 20,
});

const ImgDescription = styled(Typography)({
	fontSize: 11,
	color: COLOR.GRAY,
	fontWeight: "bold",
	margin: "0 auto",
});

const IntroMsg = styled(Typography)({
	fontSize: 18,
	fontWeight: "bolder",
	textAlign: "center",
	marginBottom: 30,
});

/** 서브 소설 작성 후 소설 커버 이미지 업로드 하는 팝업 */
const SetNovCoverPopup = () => {

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={COLOR.BLACK}
				name={LABEL.BUTTONS.SUBMIT}
				width={100}
				margin={"-10px -5px 0px auto"}
			/>
			<IntroMsg>{MESSAGE.SELECT_COVER_INTRO}</IntroMsg>
			<ImgBox>
				<CoverImg />
				<ImgDescription>{MESSAGE.BASIC_COVER_INTRO}</ImgDescription>
			</ImgBox>
		</Wrapper>
	);
};

export default SetNovCoverPopup;
