// // React Package Module
// import { useEffect, useState, React } from "react";

// // MUI Package Module
// import { Box, styled, Typography } from "@mui/material";

// // Control Component
// import Buttons from "components/controls/Button";

// // Constant
// import { CODE, LABEL, COLOR } from "common";

// // API
// import { getData } from "common/communication";

// /** STYLE 정의 */
// // 전체 영역
// const Wrapper = styled(Box)({
// 	width: "100%",
// 	display: "flex",
// 	flexDirection: "column",
// 	padding: "0 3%",
// 	boxSizing: "border-box",
// 	marinTop: "-30px",
// 	height: "100%",
// });

// // 제목, 이어쓰기 버튼 영역
// const HeaderBox = styled(Box)({
// 	width: "100%",
// 	display: "flex",
// 	boxSizing: "border-box",
// });

// const Title = styled(Typography)({
// 	marginBottom: 15,
// 	fontSize: 18,
// 	fontWeight: "bold",
// });

// const Content = styled(Typography)({
// 	fontSize: 15,
// 	whiteSpace: "pre-wrap",
// });

// /** 미완성 작품 (메인 소설) 읽기 컴포넌트 (작품 상세 페이지에서 view 버튼 클릭 시 미완성작일 경우 해당 팝업 띄워줌) */
// const ViewIncompleteNovPopup = (props) => {
// 	const [mainNovel, setMainNovel] = useState({}); // 메인 소설 데이터

// 	// 미완성 소설 보기
// 	useEffect(() => {
// 		getData("novel/getMainNovel", { novel_seqno: props.main_seqno })
// 			.then(function (data) {
// 				// 현재 팝업과 소설 상세 페이지에서 값을 공유해야 하므로 2군데 데이터 세팅
// 				setMainNovel(data[0]);

// 				// NovDetail에서 필요한 데이터만 뽑아 가공 후 전달
// 				const mainData = {
// 					title: data[0].title,
// 					content: data[0].content,
// 					main_seqno: data[0].main_seqno,
// 				};
// 				props.setMainNovel(mainData);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}, []);

// 	return (
// 		<Wrapper>
// 			<HeaderBox>
// 				<Title>{mainNovel && mainNovel.title}</Title>
// 				{/* <Title>{mainNovel && mainNovel.title.replace("\\n"," ")}</Title> */}

// 				{mainNovel.created_user !== props.login_id && (
// 					<Buttons
// 						type={CODE.BUTTON.BASIC}
// 						backgroundColor={COLOR.WHITE}
// 						color={COLOR.BLACK}
// 						name={LABEL.BUTTONS.GOTOWRITE}
// 						margin={"-30px 0px 0px auto"}
// 						padding={0}
// 						changeState={props.changeState}
// 					/>
// 				)}
// 			</HeaderBox>
// 			{/* 문자열을 \n 기준으로 나누고 각 줄마다 <br /> 태그를 추가하여 줄바꿈 처리함 */}
// 			{/* 자바스크립트에서 \은 특수 문자를 나타내기 때문에 실제 문자 \를 찾으려면 \\로 표현해야 함 */}
// 			<Content>
// 				{mainNovel && mainNovel.content
// 					? mainNovel.content.replace(/\\\\\\"/g, `"`).split("\\n").map((line) => (
// 							<>
// 								{line}
// 								<br />
// 							</>
// 					  ))
// 					: ""}
// 			</Content>
// 		</Wrapper>
// 	);
// };

// export default ViewIncompleteNovPopup;
// React Package Module
import { useEffect, useState, React } from "react";

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
  paddingRight: "1.5%",
	boxSizing: "border-box",
	paddingTop: "20px",
	height: "100%",
  overflow: "auto",
});

// 제목, 이어쓰기 버튼 영역
const HeaderBox = styled(Box)({
	width: "100%",
	display: "flex",
	boxSizing: "border-box",
  flexShrink: 0
});

const Title = styled(Typography)({
	marginBottom: 15,
	fontSize: 18,
	fontWeight: "bold",
});

const Content = styled(Typography)({
	fontSize: 15,
  whiteSpace: "pre-wrap",
  paddingRight: 20,

  
});

const ScrollBox = styled(Box)({
  overflow: "auto",
	height: "100%",

  '&::-webkit-scrollbar': {
    width: 7, 
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#aaa',
    borderRadius: 5,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
})


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
				{/* <Title>{mainNovel && mainNovel.title.replace("\\n"," ")}</Title> */}
				{mainNovel.created_user !== props.login_id && (
					<Buttons
						type={CODE.BUTTON.BASIC}
						backgroundColor={COLOR.WHITE}
						color={props.color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
						name={LABEL.BUTTONS.GOTOWRITE}
						margin={"-30px 0px 0px auto"}
						padding={0}
						changeState={props.changeState}
					/>
				)}
			</HeaderBox>
			<ScrollBox>
				<Content>
					{mainNovel && mainNovel.content
						? mainNovel.content.split("\\n").map((line, i) => (
								<>
									{line}
									<br />
								</>
						  ))
						: ""}
				</Content>
			</ScrollBox>
		</Wrapper>
	);
};

export default ViewIncompleteNovPopup;