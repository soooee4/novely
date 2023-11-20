import { useEffect, useState } from "react";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { Box, styled, Typography } from "@mui/material";
import { CODE, LABEL, COLOR } from "common";
import Inputs from "components/controls/Input";
import ModalPopup from "components/popup/ModalPopup";

// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
	// border:'3px solid blue',
	marinTop: "-30px",
});

const WholeBox = styled(Box)({
	// border: "2px solid yellow",
	width: "100%",
	height: "100%",
	display: "flex",
	gap: 20,
	marginTop: 20,
	boxSizing: "border-box",
});

const ViewBox = styled(Box)({
	// border: "2px solid grey",
	flex: 1,
	height: "100%",
	border: `1px solid ${COLOR.GRAY}`,
	borderRadius: 10,
	padding: 10,
	boxSizing: "border-box",
});

const WriteBox = styled(Box)({
	// border: "2px solid orange",
	flex: 1,
	height: "100%",
	boxSizing: "border-box",
});

// 제목, 이어쓰기 버튼 영역
const HeaderBox = styled(Box)({
	width: "100%",
	display: "flex",
	boxSizing: "border-box",
	// border:'3px solid pink',
});

const Content = styled(Typography)({
	fontSize: 15,
});

const writeNovText = {
	width: "100%",
	height: "100%",
	boxSizing: "borderBox",
	resize: "none",
	outline: "none",
	borderRadius: 10,
	padding: 10,
	fontSize: 17,
	boxSizing: "border-box",
};

/** 작가 권한일 시 메인 소설을 쓰는 컴포넌트 (내 작품 페이지에서 새 소설 쓰기 버튼 클릭 시 해당 팝업 띄워줌) */
const AuthorWriteNovPopup = (props) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	// 저장 후 다음 버튼 눌렀을 때 AuthorMyNov 페이지에 있는 (서버로 보낼) 상태값에 데이터 세팅
	const authorNovelHandler = () => {
		props.setTitleContent({
			title: title,
			content: content,
		});
	};

	const inputTitle = (e) => {
		setTitle(e.target.value);
	};

	const inputContent = (e) => {
		setContent(e.target.value);
	};

	// console.log(props, 98);

	// 저장 후 다음 버튼 눌렀을 때 NovDetail 페이지에 있는 (서버로 보낼) 상태값에 데이터 세팅
	// const AuthorNovelHandler = () => {
	// 	props.setTitleContent({
	// 		title: title,
	// 		content: content,
	// 	});
	// };

	return (
		<Wrapper>
			<HeaderBox>
				<Inputs
					fullWidth
					// defaultValue={props.mainNovel.title}
					onChange={inputTitle}
					sx={{ width: "70%" }}
				/>
				<Buttons
					type={CODE.BUTTON.BASIC}
					backgroundColor={COLOR.WHITE}
					color={COLOR.BLACK}
					name={LABEL.BUTTONS.GOTONEXT}
					margin={"-17px 0px 0px auto"}
					AuthorNovelHandler={authorNovelHandler}
					changeState={props.changeState}
				/>
			</HeaderBox>
			<WholeBox>
				<WriteBox>
					<textarea style={writeNovText} onChange={inputContent} />
				</WriteBox>
			</WholeBox>

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

export default AuthorWriteNovPopup;
