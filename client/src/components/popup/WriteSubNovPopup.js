// React Package Module
import { useEffect, useState } from "react";

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

const ScrollBox = styled(Box)({
  overflow: "auto",
	height: "100%",

  '&::-webkit-scrollbar': {
    width: 5, 
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#aaa',
    borderRadius: 5,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
})

const ViewBox = styled(Box)({
	flex: 1,
	height: "100%",
	border: `1px solid ${COLOR.GRAY}`,
	borderRadius: 10,
	padding: 10,
  paddingRight:5,
	boxSizing: "border-box",

});

const WriteBox = styled(Box)({
  flex: 1,
	height: "100%",
	boxSizing: "border-box",
  borderRadius: 10,
  padding: 10,
  paddingRight:5,
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


const Content = styled(Typography)({
	fontSize: 15,
  marginRight:5
});

const writeNovText = (color) => {
  return (
    {
      border:'none',
      width: "100%",
      height: "100%",
      boxSizing: "borderBox",
      resize: "none",
      outline: "none",
      fontSize: 17,
      boxSizing: "border-box",
      backgroundColor: color,
      color: color === "#121212" ? "white" : "black",
    }
  )
};

/** 서브 소설 title, content 작성 컴포넌트 (미완성 소설 보는 팝업에서 이어쓰기 버튼 클릭 시 해당 팝업 띄워줌) */
const WriteSubNovPopup = (props) => {
	const [title, setTitle] = useState("");           // 서브 소설 제목
	const [content, setContent] = useState("");       // 서브 소설 내용
  // const [isScrolling, setIsScrolling] = useState(false);
  const [contentCount, setContentCount] = useState(0) // 내용 글자수 체크

	const inputTitle = (e) => {
		setTitle(e.target.value);
	};

	const inputContent = (e) => {
		setContent(e.target.value);
    setContentCount(e.target.value.length);

	};

  console.log(title,1211)
  // 저장 후 다음 버튼 눌렀을 때 NovDetail 페이지에 있는 (서버로 보낼) 상태값에 데이터 세팅
	const postSubNovel = () => {
		if (content === "") {
			alert(MESSAGE.ERROR.WRITE_CONTENT);
			return;
		} else if (title.length > 50) {
			alert(MESSAGE.ERROR.TITLE_INVALIDATION);
			return;
		} else {
			props.setTitleContent({
				title: title,
				content: content,
				main_novel_seqno: props.mainNovel.main_seqno,
			});
		}
	};

  //스크롤 감지하여 화면에 띄워주는 함수
  // const handleScroll = () => {
  //   setIsScrolling(true);
  //   // 스크롤링 0.5초 후 동작 멈춤
  //   setTimeout(() => {
  //     setIsScrolling(false);
  //   }, 1000);
  // }
  
  // useEffect(() => {
  //   const temp = document.querySelector('.cc')
  //   temp.addEventListener("scroll", handleScroll);

  //   // 클린업 (언마운트 시 이벤트 리스너 삭제)
  //   return () => {
  //     temp.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

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
					changeState={(content !== "" && title.length <= 50) && props.changeState}
				/>
			</HeaderBox>
			<WholeBox>
				<ViewBox>
					<ScrollBox>
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
					</ScrollBox>
				</ViewBox>
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

export default WriteSubNovPopup;