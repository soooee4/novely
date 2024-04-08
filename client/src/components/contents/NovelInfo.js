// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

// Constant
import { CODE, LABEL, COLOR } from "common";
import { useDispatch, useSelector } from "react-redux";
import { setClickData, setModalOpen } from "redux/slice";

/** STYLE 정의 */
// 전체 영역
const Whole = styled(Box)({
	width: 1050,
	display: "flex",
	marginTop: 20,
	marginBottom: 25,
	boxSizing: "border-box",
});

// 좌측 소개글 및 이미지 영역
const InfoBox = styled(Box)({
	boxSizing: "border-box",
	height: "100%",
	flexGrow: 1,
});

// 마감 기한 표시 및 view 버튼 영역
const DateBox = styled(Box)({
	justifyContent: "flex-end",
});

// 소설 제목 영역
const TitleBox = styled(Box)({
	marginBottom: 5,
});

// 작가 이름 영역
const AuthorBox = styled(Box)({
	width: "100%",
	minHeight: 16,
});

// 소설 소개 영역
const DescriptionBox = styled(Box)({
	flexGrow: 1,
	marginTop: 12,
	marginBottom: 15,
});

// 제목 텍스트
const Title = styled(Typography)({
	fontSize: 23,
	fontWeight: 800,
	marginBottom: 10,
});

// 작가 이름 텍스트
const Author = styled(Typography)({
	fontSize: 15,
	"&:hover": {
		cursor: "pointer",
		fontWeight: 900,
	},
});

// 소설 소개 텍스트
const Description = styled(Typography)({
	fontSize: 13,
	color: COLOR.GRAY,
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
	overflow: "hidden",
});

// 기한 표시 텍스트
const DateInfo = styled(Typography)({
	fontSize: 23,
	marginTop: 30,
	marginBottom: 15,
	textAlign: "right",
});

//  view 버튼 영역
const NovelViewBox = styled(Box)({
	flex: 1,
	display: "flex",
	width: 70,
	marginLeft: "auto",
});

/** 소설 축약 정보 컴포넌트(소설 상세보기 페이지의 헤더) */
const NovelInfo = (props) => {
	const {
		complete_seqno,
		title,
		complete_novel_title,
		main_author_id,
		main_author_nickname,
		sub_author_id,
		sub_author_nickname,
		user_nickname,
		description,
		created_user,
	} = useSelector((state) => state.main.clickNovel);

	const dispatch = useDispatch();
	const clickAuthorId = (id, nickname) => {
		dispatch(
			setModalOpen({
				open: true,
				content: "authorDetail",
				width: "85%",
				height: 400,
			})
		);
		dispatch(setClickData({ authorId: id, authorNickname: nickname }));
	};

	return (
		<Whole>
			<InfoBox>
				<TitleBox>
					<Title>{complete_seqno ? complete_novel_title : title}</Title>
				</TitleBox>
				<AuthorBox>
					{main_author_id ? (
						<>
							<Author
								onClick={() =>
									clickAuthorId(main_author_id, main_author_nickname)
								}
							>
								By.{main_author_nickname}
							</Author>
							{sub_author_id && (
								<Author
									onClick={() =>
										clickAuthorId(sub_author_id, sub_author_nickname)
									}
								>
									By.{sub_author_nickname}
								</Author>
							)}
						</>
					) : (
						<Author onClick={() => clickAuthorId(created_user, user_nickname)}>
							By.{user_nickname}
						</Author>
					)}
				</AuthorBox>
				<DescriptionBox>
					{/* 사용자가 줄바꿈을 했을 때 공백으로 띄워주기 위해 replace 매서드 사용 */}
					<Description>
						{description && description.replace(/\\n/g, " ")}
					</Description>
				</DescriptionBox>
			</InfoBox>

			<DateBox>
				<DateInfo>{props.novelDdayCounter}</DateInfo>
				<NovelViewBox
					onClick={() => {
						dispatch(
							setModalOpen({
								open: true,
								content: complete_seqno ? "viewComNov" : "viewIncomNov",
								fullWidth: true,
								width: "90%",
								height: "90vh",
							})
						);
					}}
				>
					<Buttons
						type={CODE.BUTTON.BASIC}
						name={LABEL.BUTTONS.VIEWNOVEL}
						height={10}
						fontSize={17}
					/>
				</NovelViewBox>
			</DateBox>
		</Whole>
	);
};

export default NovelInfo;
