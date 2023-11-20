import { useEffect, useState } from "react";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { Box, styled, Typography } from "@mui/material";
import { CODE, LABEL, COLOR } from "common";

import { getData } from "common/communication";

// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	boxSizing: "border-box",
	// border: "3px solid blue",
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
	backgroundColor: "skyblue",
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
const SetNovCoverPopup = (props) => {
	// *제출 버튼 클릭 시 실행할 기능들 함수
	// submitBtnHandler = () => {
	// NovDetail에 데이터 전송, changeState
	// 이미지 선택하지 않았을 시 기본 이미지 넣어주기
	// '제출 후 수정 불가' alert 띄워주기
	// 해당 main_novel_seqno에 해당하는 소설 상세 페이지로 이동 (새로고침)
	// }

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={COLOR.BLACK}
				name={LABEL.BUTTONS.SUBMIT}
				width={100}
				margin={"-10px -5px 0px auto"}
				// subDescHandler={subDescHandler}
				// changeState={props.changeState}
			/>
			<IntroMsg>
				마지막으로, <br />
				이야기를 한눈에 보여줄 표지를 등록해보세요!
			</IntroMsg>
			<ImgBox>
				<CoverImg />
				<ImgDescription>
					표지가 없어도 걱정 마세요, 기본 이미지로 설정해드릴게요 :)
				</ImgDescription>
			</ImgBox>
		</Wrapper>
	);
};

export default SetNovCoverPopup;
