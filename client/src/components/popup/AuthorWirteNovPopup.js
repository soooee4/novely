// React Package Module
import { useState } from "react";

// MUI Package Module
import { Box, styled } from "@mui/material";

// Control Component
import Buttons from "components/controls/Button";
import Inputs from "components/controls/Input";

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
	height: "100%",
	display: "flex",
	gap: 20,
	marginTop: 20,
	boxSizing: "border-box",
});

const WriteBox = styled(Box)({
	flex: 1,
	height: "100%",
	boxSizing: "border-box",
});

// 제목, 이어쓰기 버튼 영역
const HeaderBox = styled(Box)({
	width: "100%",
	display: "flex",
	boxSizing: "border-box",
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
	const [title, setTitle] = useState("");           // 소설 제목
	const [content, setContent] = useState("");       // 소설 내용

	// 저장 후 다음 버튼 눌렀을 때 AuthorMyNov 페이지에 있는 (서버로 보낼) 상태값에 데이터 세팅
	const postAuthorNovel = () => {
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

  const goToNext = () => {
    if (title === "") {
      alert(MESSAGE.ERROR.WRITE_TITLE)
      return;
    } else if (content === "") {
      alert(MESSAGE.ERROR.WRITE_CONTENT)
      return;
    } else {
      props.changeState()
    }
  }

	return (
		<Wrapper>
			<HeaderBox>
				<Inputs
					fullWidth
					onChange={inputTitle}
					sx={{ width: "70%" }}
				/>
				<Buttons
					type={CODE.BUTTON.BASIC}
					backgroundColor={COLOR.WHITE}
					color={COLOR.BLACK}
					name={LABEL.BUTTONS.GOTONEXT}
					margin={"-17px 0px 0px auto"}
					postAuthorNovel={postAuthorNovel}
					// changeState={(title !== "" || content !== "") && props.changeState}
          goToNext={goToNext}
				/>
			</HeaderBox>
			<WholeBox>
				<WriteBox>
					<textarea style={writeNovText} onChange={inputContent} />
				</WriteBox>
			</WholeBox>
		</Wrapper>
	);
};

export default AuthorWriteNovPopup;
