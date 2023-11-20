import { useEffect, useState } from "react";

// Constant
import { Box, styled, Typography } from "@mui/material";

import { getData } from "common/communication";

	// 레이아웃
	const Wrapper = styled(Box)({
		width: "100%",
		display: "flex",
		flexDirection: "column",
    padding: '0 3%',
    boxSizing: 'border-box'
	});

	const Title = styled(Typography)({
		marginBottom: 15,
		fontSize: 18,
		fontWeight: "bold",
	});

	const Content = styled(Typography)({
		fontSize: 17,
		// wordBreak: 'break-all',
	});

	// Top 버튼 함수 (최상단으로 스크롤 이동)
	// const scrollToTop = () => {
	// 	window.ScrollTo({
	// 		top: 0,
	// 		behavior: "smooth",
	// 	});
	// };

/** 완성 작품 읽기 컴포넌트 (작품 상세 페이지에서 view 버튼 클릭 시 완성작일 경우 해당 팝업 띄워줌) */
const ViewCompleteNovPopup = (props) => {

	const [completeNovel, setCompleteNovel] = useState({});

	// 완성 소설 보기
	useEffect(() => {
		getData("novel/getCompleteNovel", { complete_seqno: props.complete_seqno })
			.then(function (data) {
				setCompleteNovel(data);
				console.log(completeNovel,393939)
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

  	// !미완성 소설 보기
	// useEffect(() => {
	// 	console.log(props.complete_seqno, 1818);
	// 	getData("novel/getCompleteNovel", { complete_seqno: props.complete_seqno })
	// 		.then(function (data) {
	// 			setCompleteNovel(data);
	// 			// console.log(completeNovel,393939)
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);



	return (
		<Wrapper>
			<Title>{completeNovel[0] && completeNovel[0].complete_novel_title}</Title>
			<Content>
				{completeNovel[0] && completeNovel[0].complete_novel_content}
			</Content>

			{/* 완성 소설의 경우 이어쓰기 버튼 표시하지 않음 */}
			{/* <Buttons 
        type={CODE.BUTTON.BASIC}
        backgroundColor={COLOR.WHITE}
        color={COLOR.BLACK}
        name={LABEL.BUTTONS.GOTOWRITE}
      ></Buttons> */}

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

export default ViewCompleteNovPopup;
