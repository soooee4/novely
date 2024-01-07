// React Package Module
import { useState } from "react";

// MUI Package Module
import { Box, Typography, styled } from "@mui/material";

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
  padding: 15,
  paddingRight: 5,
  borderRadius: 10,
	border: `1px solid ${COLOR.GRAY}`,


  '&>textarea::-webkit-scrollbar': {
    width: 5, 
  },
  '&>textarea::-webkit-scrollbar-thumb': {
    background: '#aaa',
    borderRadius: 5,
  },
  '&>textarea::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
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
  margin: "3px 5px 0px auto"
});

const writeNovText = (color) => {
  return (
    {
      paddingRight: 10,
      border:'none',
      width: "100%",
      height: "100%",
      resize: "none",
      outline: "none",
      fontSize: 17,
      boxSizing: "border-box",
      backgroundColor: color,
      color: color === "#121212" ? "white" : "black"
    }
  )
};


/** 작가 권한일 시 메인 소설을 쓰는 컴포넌트 (내 작품 페이지에서 새 소설 쓰기 버튼 클릭 시 해당 팝업 띄워줌) */
const AuthorWriteNovPopup = (props) => {
	const [title, setTitle] = useState(""); 	// 소설 제목
	const [content, setContent] = useState(""); // 소설 내용
  const [contentCount, setContentCount] = useState(0) // 내용 글자수 체크

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
    setContentCount(e.target.value.length);
	};

	const goToNext = () => {
		if (title === "") {
			alert(MESSAGE.ERROR.WRITE_TITLE);
			return;
		} else if (content === "") {
			alert(MESSAGE.ERROR.WRITE_CONTENT);
			return;
		} else if (title.length > 50) {
			alert(MESSAGE.ERROR.TITLE_INVALIDATION);
			return; 
    } else {
			props.changeState();
		}
	};

	return (
		<Wrapper>
			<HeaderBox>
				<Inputs
					fullWidth
					onChange={inputTitle}
					sx={{ width: "70%" }}
					color={props.color}
          maxLength={50}
				/>
				<Buttons
					type={CODE.BUTTON.BASIC}
					color={props.color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
					name={LABEL.BUTTONS.GOTONEXT}
					margin={"-17px 0px 0px auto"}
					postAuthorNovel={postAuthorNovel}
					goToNext={goToNext}
				/>
			</HeaderBox>
			<WholeBox>
				<WriteBox>
					<textarea 
            style={writeNovText(props.color)} 
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

export default AuthorWriteNovPopup;