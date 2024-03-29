// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";

// API
import { postData } from "common/communication";

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
  paddingTop: 20
});

const WholeBox = styled(Box)({
	width: "100%",
	height: "88%",
	display: "flex",
	gap: 20,
	boxSizing: "border-box",
});

const MainNovBox = styled(Box)({
	width: "100%",
	boxSizing: "border-box",
	display: "flex",
	flexDirection: "column",
});

const SubNovBox = styled(Box)({
	width: "100%",
	boxSizing: "border-box",
	display: "flex",
	flexDirection: "column",
});

const Title = styled(Typography)({
	marginBottom: 15,
	marginTop: -4,
	fontSize: 18,
	fontWeight: "bold",
});

const Content = styled("div")({
	fontSize: 15
});

// 내용 표시되는 영역
const ContentBox = styled(Box)({
  boxSizing: "border-box",
	border: "2px solid grey",
	flex: 1,
	border: `1px solid ${COLOR.GRAY}`,
	borderRadius: 10,
	padding: "8px 5px 0px 0px",
	boxSizing: "border-box",
  overflow: "auto",
  height: "100%",
});

const ScrollBox = styled(Box)({
  boxSizing: "border-box",
  overflowY: "auto",
  height: "100%",
  padding: "0 3%",

	'&::-webkit-scrollbar': {
		width: 5
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: '#aaa',
		borderRadius: 5,

	},
	'&::-webkit-scrollbar-track': {
		backgroundColor: 'transparent',
    width: 10,
	},
});


/** 미완성 작품 (메인 소설)에 달린 서브 소설 읽기 컴포넌트 (작품 상세 페이지 하단 테이블의 소설 제목 클릭 시 해당 팝업 띄워줌) */
const ViewSubNovPopup = (props) => {

	// 투표하기 버튼 눌렀을 때 실행될 기능 함수
	const likeSubNovel = () => {
		if (props.subNovelData.like_yn === "N") {
			if (window.confirm(MESSAGE.CONFIRM_VOTE)) {
				postData("novel/postLikeSubNovel", {
					sub_novel_seqno: props.subNovelData.sub_novel_seqno,
					user_id: props.user_id,
				})
					.then((data) => {
						props.getSubNovelData();
            alert(MESSAGE.VOTED);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		} else if (props.subNovelData.like_yn === "Y") {
			alert(MESSAGE.ALREADY_VOTED);
		} 
	};

	return (
		<Wrapper>
			{/* 서브 소설의 제목만 표시 */}
			<Title>{props.subNovelData.sub_title}</Title>
			<WholeBox>
				<MainNovBox>
					<ContentBox>
						<ScrollBox>
							<Content>
								{props.subNovelData &&
									props.subNovelData.content.split("\\n").map((line, i) => (
										<div key={i}>
											{line.replace("\\r", "")}
											<br />
										</div>
									))}
							</Content>
						</ScrollBox>
					</ContentBox>
				</MainNovBox>
				<SubNovBox>
					<ContentBox>
						<ScrollBox>
							<Content>
								{props.subNovelData &&
									props.subNovelData.sub_content.split("\\n").map((line, i) => (
										<div key={i}>
											{line.replace("\\r", "")}
											<br />
										</div>
									))}
							</Content>
						</ScrollBox>
					</ContentBox>
				</SubNovBox>
			</WholeBox>
			{props.subNovelData.created_user !== props.user_id &&
				!props.mainNovel.complete_seqno && (
					<Buttons
						type={CODE.BUTTON.BASIC}
						backgroundColor={COLOR.WHITE}
						color={props.color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
						name={LABEL.BUTTONS.LIKE_BTN}
						fontSize={15}
						margin={"0px -5px 0px auto"}
						likeSubNovel={likeSubNovel}
					/>
				)}
		</Wrapper>
	);
};

export default ViewSubNovPopup;