// React Package Module
import { useState } from "react";

// Control Component
import { Buttons, Inputs } from "components/controls";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen, setPostNovelData } from "redux/slice";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
});

const WholeBox = styled(Box)({
	height: "88%",
	display: "flex",
	gap: 20,
	marginTop: 20,
	boxSizing: "border-box",
});

const ScrollBox = styled(Box)({
	overflow: "auto",
	height: "100%",

	"&::-webkit-scrollbar": {
		width: 5,
	},
	"&::-webkit-scrollbar-thumb": {
		background: "#aaa",
		borderRadius: 5,
	},
	"&::-webkit-scrollbar-track": {
		backgroundColor: "transparent",
	},
});

const ViewBox = styled(Box)({
	flex: 1,
	height: "100%",
	border: `1px solid ${COLOR.GRAY}`,
	borderRadius: 10,
	padding: 10,
	paddingRight: 5,
	boxSizing: "border-box",
});

const WriteBox = styled(Box)({
	flex: 1,
	height: "100%",
	boxSizing: "border-box",
	borderRadius: 10,
	padding: 10,
	paddingRight: 5,
	border: `1px solid ${COLOR.GRAY}`,

	"&>textarea::-webkit-scrollbar": {
		width: 5,
	},
	"&>textarea::-webkit-scrollbar-thumb": {
		background: "#aaa",
		borderRadius: 5,
	},
	"&>textarea::-webkit-scrollbar-track": {
		backgroundColor: "transparent",
	},
});

// 제목, 이어쓰기 버튼 영역
const HeaderBox = styled(Box)({
	width: "100%",
	display: "flex",
	boxSizing: "border-box",
});

// 글자수 표시 영역
const CountText = styled(Typography)({
	fontSize: 13,
	margin: "3px 5px 0px auto",
});

const Content = styled(Typography)({
	fontSize: 15,
	marginRight: 5,
});

const writeNovText = (color) => {
	return {
		fontFamily: "'Pretendard-Regular', sans-serif",
		border: "none",
		width: "100%",
		height: "100%",
		resize: "none",
		outline: "none",
		fontSize: 17,
		boxSizing: "border-box",
		backgroundColor: color,
		color: color === "#121212" ? "white" : "black",
	};
};

/** 서브 소설 title, content 작성 컴포넌트 (미완성 소설 보는 팝업에서 이어쓰기 버튼 클릭 시 해당 팝업 띄워줌) */
const WriteSubNovPopup = () => {
	// redux state
	const clickNovel = useSelector((state) => state.main.clickNovel);
	const color = useSelector((state) => state.main.color);
	const loginId = useSelector((state) => state.main.profile.login_id);

	const { title, content, main_seqno } = clickNovel;

	const [subTitle, setSubTitle] = useState(""); // 서브 소설 제목
	const [subContent, setSubContent] = useState(""); // 서브 소설 내용
	const [contentCount, setContentCount] = useState(0); // 내용 글자수 체크

	const inputTitle = (e) => {
		setSubTitle(e.target.value);
	};

	const inputContent = (e) => {
		setSubContent(e.target.value);
		setContentCount(e.target.value.length);
	};

	const dispatch = useDispatch();

	// 저장 후 다음 버튼 눌렀을 때 NovDetail 페이지에 있는 (서버로 보낼) 상태값에 데이터 세팅
	const setSubNovel = () => {
		if (subContent === "") {
			alert(MESSAGE.ERROR.WRITE_CONTENT);
			return;
		} else if (subTitle.length > 50) {
			alert(MESSAGE.ERROR.TITLE_INVALIDATION);
			return;
		} else {
			dispatch(
				setPostNovelData({
					title: subTitle === "" ? title : subTitle,
					content: subContent,
					main_novel_seqno: main_seqno,
					created_user: loginId,
				})
			);
			dispatch(
				setModalOpen({
					open: true,
					content: "selectTag",
					width: 450,
					height: 420,
				})
			);
		}
	};

	return (
		<Wrapper>
			<HeaderBox>
				<Inputs
					fullWidth
					defaultValue={title}
					onChange={inputTitle}
					color={color}
				/>
				<Buttons
					type={CODE.BUTTON.BASIC}
					color={color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
					name={LABEL.BUTTONS.GOTONEXT}
					margin={"-20px 0px 0px auto"}
					onClick={setSubNovel}
				/>
			</HeaderBox>
			<WholeBox>
				<ViewBox>
					<ScrollBox>
						<Content>
							{content && content
								? content.split("\\n").map((line, i) => (
										<div key={i}>
											{line.replace("\\r", "")}
											<br />
										</div>
								  ))
								: ""}
						</Content>
					</ScrollBox>
				</ViewBox>
				<WriteBox>
					<textarea
						style={writeNovText(color)}
						onChange={inputContent}
						maxLength={10000}
					/>
				</WriteBox>
			</WholeBox>
			{contentCount === 10000 ? (
				<CountText style={{ color: "red" }}>{contentCount}/10000</CountText>
			) : (
				<CountText>{contentCount}/10000</CountText>
			)}
		</Wrapper>
	);
};

export default WriteSubNovPopup;
