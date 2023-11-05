import { useEffect, useState } from "react";

// Control Component
import Buttons from "components/controls/Button";

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
  padding: '0 3%',
  boxSizing: 'border-box',
  border:'3px solid blue',
});

// 제목, 이어쓰기 버튼 영역
const HeaderBox = styled(Box)({
  width: "100%",
  display: "flex",
  boxSizing: 'border-box',
  border:'3px solid pink',
});

const Title = styled(Typography)({
  marginBottom: 15,
  fontSize: 18,
  fontWeight: "bold",
  border:'3px solid red'
});

const Content = styled(Typography)({
  fontSize: 17,
  border:'3px solid orange'
  // wordBreak: 'break-all',
});

// Top 버튼 함수 (최상단으로 스크롤 이동)
// const scrollToTop = () => {
// 	window.ScrollTo({
// 		top: 0,
// 		behavior: "smooth",
// 	});
// };

const ViewIncompleteNovPopup = (props) => {
	const [mainNovel, setMainNovel] = useState({});
  console.log(props,4343)

  // 미완성 소설 보기
	useEffect(() => {

		getData("novel/getMainNovel", { novel_seqno: props.main_seqno })
			.then(function (data) {
				setMainNovel(data[0]);

			})
			.catch((err) => {
				console.log(err);
			});
	}, []);


	return (
		<Wrapper>
      <HeaderBox>
        <Title>{mainNovel && mainNovel.title}</Title>
        <Buttons 
          type={CODE.BUTTON.BASIC}
          backgroundColor={COLOR.WHITE}
          color={COLOR.BLACK}
          name={LABEL.BUTTONS.GOTOWRITE}
          width={100}
        />
      </HeaderBox>
			<Content>
				{mainNovel && mainNovel.content}
			</Content>

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

export default ViewIncompleteNovPopup;