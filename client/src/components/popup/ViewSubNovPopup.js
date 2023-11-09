import { useEffect, useState } from "react";

// Control Component
import Buttons from "components/controls/Button";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

// Constant
import { Box, styled, Typography } from "@mui/material";
import { CODE, LABEL, COLOR } from "common";

import { getData } from "common/communication";

// 레이아웃

// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
	border:'3px solid blue',
	marinTop: "-30px",
	height: "100%",
});

const WholeBox = styled(Box)({
	width: "100%",
	height: "88%",
	display: "flex",
	gap: 20,
	boxSizing: "border-box",
	border: "3px solid green",
});

const MainNovBox = styled(Box)({
	width: "100%",
	boxSizing: "border-box",
	// border: "3px solid pink",
	display: "flex",
	flexDirection: "column",
});

const SubNovBox = styled(Box)({
	width: "100%",
	boxSizing: "border-box",
	display: "flex",
	flexDirection: "column",
	// border:'3px solid blue',
});

const Title = styled(Typography)({
	marginBottom: 15,
  marginTop: -4,
	fontSize: 18,
	fontWeight: "bold",
	// border: "3px solid red",
});

const Content = styled(Typography)({
	fontSize: 15,
	// border: "3px solid orange",
	// wordBreak: 'break-all',
});


// 내용 표시되는 영역
const ContentBox = styled(Box)({
	border: "2px solid grey",
	flex: 1,
	border: `1px solid ${COLOR.GRAY}`,
	borderRadius: 10,
	padding: 10,
	boxSizing: "border-box",
  // marginBottom: 40
});

// Top 버튼 함수 (최상단으로 스크롤 이동)
// const scrollToTop = () => {
// 	window.ScrollTo({
// 		top: 0,
// 		behavior: "smooth",
// 	});
// };mainNovel

const ViewSubNovPopup = (props) => {
	console.log(props.subNovelData, "mainData");

	return (
		<Wrapper>
      {/* 서브 소설의 제목만 표시 */}
			<Title>{props.subNovelData.sub_title}</Title>
			<WholeBox>
				<MainNovBox>
					<ContentBox>
						<Content>{props.mainNovel.content}</Content>
					</ContentBox>
				</MainNovBox>
				<SubNovBox>
					<ContentBox>
						<Content>{props.subNovelData.sub_content}</Content>
					</ContentBox>
				</SubNovBox>
			</WholeBox>
      <Buttons
					type={CODE.BUTTON.BASIC}
					backgroundColor={COLOR.WHITE}
					color={COLOR.BLACK}
					name={LABEL.BUTTONS.LIKE_BTN}
          fontSize={13}
					margin={"0px -5px 0px auto"}
				/>

			{/* 추후 top 기능 구현하기 */}
			{/* <Buttons
				sx={{
					cursor: "pointer",
				}}
				type={CODE.BUTTON.BASIC}
				name={LABEL.BUTTONS.TOP}
				// onClick={scrollToTop}
				margin={"0px 0px 0px 83%"}
			/> */}
		</Wrapper>
	);
};

export default ViewSubNovPopup;
