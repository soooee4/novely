// React Package Module
import { useState } from "react";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux"; 
import { setPostNovelData, setModalOpen } from "redux/slice";

// MUI Package Module
import { Box, Typography, styled } from "@mui/material";

// Control Component
import { Buttons, Inputs } from "components/controls";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";

/** STYLE 정의 */
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
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

const HeaderBox = styled(Box)({
	width: "100%",
	display: "flex",
	boxSizing: "border-box",
});

const CountText = styled(Typography)({
	fontSize: 13,
	margin: "3px 5px 0px auto",
});

const writeNovText = (color) => ({
	fontFamily: "'Pretendard-Regular', sans-serif",
	paddingRight: 10,
	border: "none",
	width: "100%",
	height: "100%",
	resize: "none",
	outline: "none",
	fontSize: 17,
	boxSizing: "border-box",
	backgroundColor: color,
	color: color === "#121212" ? "white" : "black",
});

const AuthorWriteNovPopup = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [contentCount, setContentCount] = useState(0);

	const dispatch = useDispatch();

	const color = useSelector((state) => state.main.color);

	const inputTitle = (e) => setTitle(e.target.value);

	const inputContent = (e) => {
		setContent(e.target.value);
		setContentCount(e.target.value.length);
	};

	const goToNext = () => {
		if (title === "") {
			alert(MESSAGE.ERROR.WRITE_TITLE);
		} else if (content === "") {
			alert(MESSAGE.ERROR.WRITE_CONTENT);
		} else if (title.length > 50) {
			alert(MESSAGE.ERROR.TITLE_INVALIDATION);
		} else {
			dispatch(
				setModalOpen({
					open: true,
					content: "authorWriteIntro",
					width: 400,
					height: 500,
				})
			);
			dispatch(
				setPostNovelData({
					title,
					content,
				})
			);
		}
	};

	return (
		<Wrapper>
			<HeaderBox>
				<Inputs
					fullWidth
					onChange={inputTitle}
					sx={{ width: "70%" }}
					color={color}
					maxLength={50}
				/>
				<Buttons
					type={CODE.BUTTON.BASIC}
					backgroundColor={COLOR.WHITE}
					color={color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
					name={LABEL.BUTTONS.GOTONEXT}
					margin={"-17px 0px 0px auto"}
					onClick={goToNext}
				/>
			</HeaderBox>
			<WholeBox>
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

export default AuthorWriteNovPopup;
