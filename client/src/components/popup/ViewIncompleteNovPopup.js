// React Package Module
import { useEffect, useState } from "react";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { CODE, LABEL, COLOR } from "common";

// API
import { getData } from "common/communication";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
	marinTop: "-30px",
	height: "100%",
});

// 제목, 이어쓰기 버튼 영역
const HeaderBox = styled(Box)({
	width: "100%",
	display: "flex",
	boxSizing: "border-box",
});

const Title = styled(Typography)({
	marginBottom: 15,
	fontSize: 18,
	fontWeight: "bold",
});

const Content = styled(Typography)({
	fontSize: 15,
});

/** 미완성 작품 (메인 소설) 읽기 컴포넌트 (작품 상세 페이지에서 view 버튼 클릭 시 미완성작일 경우 해당 팝업 띄워줌) */
const ViewIncompleteNovPopup = (props) => {
	const [mainNovel, setMainNovel] = useState({});         // 메인 소설 데이터

	// 미완성 소설 보기
	useEffect(() => {
		getData("novel/getMainNovel", { novel_seqno: props.main_seqno })
			.then(function (data) {
				// 현재 팝업과 소설 상세 페이지에서 값을 공유해야 하므로 2군데 데이터 세팅
				setMainNovel(data[0]);

				// NovDetail에서 필요한 데이터만 뽑아 가공 후 전달
				const mainData = {
					title: data[0].title,
					content: data[0].content,
					main_seqno: data[0].main_seqno,
				};
				props.setMainNovel(mainData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Wrapper>
			<HeaderBox>
				<Title>{mainNovel && mainNovel.title}</Title>
				{mainNovel.created_user !== props.login_id &&
					<Buttons
						type={CODE.BUTTON.BASIC}
						backgroundColor={COLOR.WHITE}
						color={COLOR.BLACK}
						name={LABEL.BUTTONS.GOTOWRITE}
						margin={"-30px 0px 0px auto"}
						padding={0}
						changeState={props.changeState}
					/>
				}
			</HeaderBox>
			{/* <Content>{mainNovel && mainNovel.content}</Content> */}
			<Content>{mainNovel && mainNovel.content.replace("\n","<br />")}</Content>

  
   

		</Wrapper>
	);
};

export default ViewIncompleteNovPopup;
