// React Package Module
import { useState } from "react";

// Control Component
import Buttons from "components/controls/Button";
import Inputs from "components/controls/Input";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
	marinTop: "-30px",
});

const WholeBox = styled(Box)({
	width: "100%",
	height: "88%",
	display: "flex",
	gap: 20,
	marginTop: 20,
	boxSizing: "border-box",
});

const ViewBox = styled(Box)({
	flex: 1,
	height: "100%",
	border: `1px solid ${COLOR.GRAY}`,
	borderRadius: 10,
	padding: 10,
	boxSizing: "border-box",
  overflow: "auto",
});

const WriteBox = styled(Box)({
	flex: 1,
	height: "100%",
	boxSizing: "border-box",
	overflow: "auto",
	display: "flex",
	alignItems: "flex-start",
});

// 제목, 이어쓰기 버튼 영역
const HeaderBox = styled(Box)({
	width: "100%",
	display: "flex",
	boxSizing: "border-box",
});

const Content = styled(Typography)({
	fontSize: 15,
});

const writeNovText = (color) => {
  return (
    {
      width: "100%",
      height: "100%",
      boxSizing: "borderBox",
      resize: "none",
      outline: "none",
      borderRadius: 10,
      padding: 10,
      fontSize: 17,
      boxSizing: "border-box",
      backgroundColor: color,
      color: color === "#121212" ? "white" : "black"
    }
  )
};

/** 서브 소설 title, content 작성 컴포넌트 (미완성 소설 보는 팝업에서 이어쓰기 버튼 클릭 시 해당 팝업 띄워줌) */
const WriteSubNovPopup = (props) => {
	const [title, setTitle] = useState("");           // 서브 소설 제목
	const [content, setContent] = useState("");       // 서브 소설 내용

	const inputTitle = (e) => {
		setTitle(e.target.value);
	};

	const inputContent = (e) => {
		setContent(e.target.value);
	};

  // 저장 후 다음 버튼 눌렀을 때 NovDetail 페이지에 있는 (서버로 보낼) 상태값에 데이터 세팅
	const postSubNovel = () => {
        if (content === "") {
					alert(MESSAGE.ERROR.WRITE_CONTENT);
					return;
				}
		props.setTitleContent({
			title: title,      
			content: content, 
      		main_novel_seqno: props.mainNovel.main_seqno
		});
	};

	return (
		<Wrapper>
			<HeaderBox>
				<Inputs
					fullWidth
					defaultValue={props.mainNovel.title}
					onChange={inputTitle}
          			color={props.color}
					// sx={{ width: "30%" }}
				/>
				<Buttons
					type={CODE.BUTTON.BASIC}
					// backgroundColor={COLOR.WHITE}
					color={props.color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
					name={LABEL.BUTTONS.GOTONEXT}
					margin={"-20px 0px 0px auto"}
					postSubNovel={postSubNovel}
					changeState={content !== "" && props.changeState}
				/>
			</HeaderBox>
			<WholeBox>
				<ViewBox>
					<Content>
						{props.mainNovel.content && props.mainNovel.content
							? props.mainNovel.content.split("\\n").map((line, i) => (
									<div key={i}>
										{line.replace("\\r", "")}
										<br />
									</div>
							  ))
							: ""}
					</Content>
				</ViewBox>
				<WriteBox>
					<textarea style={writeNovText(props.color)} onChange={inputContent} />
				</WriteBox>
			</WholeBox>
		</Wrapper>
	);
};

export default WriteSubNovPopup;