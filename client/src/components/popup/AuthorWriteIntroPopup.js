// Redux Package Module
import { useDispatch, useSelector } from "react-redux";
import { setPostNovelData } from "redux/slice";
import { usePostMainNovelMutation } from "redux/services/NovelService";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

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

const writeNovText = (color) => ({
	fontFamily: "'Pretendard-Regular', sans-serif",
	width: "100%",
	height: "80%",
	resize: "none",
	outline: "none",
	borderRadius: 10,
	padding: 20,
	fontSize: 15,
	boxSizing: "border-box",
	marginBottom: 20,
	backgroundColor: color,
	color: color === "#121212" ? "white" : "black",
});

const IntroMsg = styled(Typography)({
	fontSize: 18,
	fontWeight: "bolder",
	textAlign: "center",
	marginBottom: 30,
});

const AuthorWriteIntroPopup = () => {
	const profile = useSelector((state) => state.main.profile);
	const postNovel = useSelector((state) => state.main.postNovel);
	const color = useSelector((state) => state.main.color);

	const [post] = usePostMainNovelMutation();
	const dispatch = useDispatch();

	const inputDescription = (e) => {
		dispatch(setPostNovelData({ description: e.target.value }));
	};

	const postMainNovel = async () => {
		await post({
			title: postNovel.title,
			content: postNovel.content,
			created_user: profile.login_id,
			description: postNovel.description,
		});
	};

	const onClick = () => {
		if (postNovel.description.length === 0) {
			alert(MESSAGE.ERROR.WRITE_DESCRIPTION);
		} else if (postNovel.description.length >= 100) {
			alert(MESSAGE.ERROR.DESC_INVALIDATION);
		} else {
			postMainNovel();
		}
	};

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
				name={LABEL.BUTTONS.SUBMIT}
				margin={"10px -5px 0px auto"}
				onClick={onClick}
			/>
			<IntroMsg>{MESSAGE.WRITE_NOVEL_INTRO}</IntroMsg>
			<textarea style={writeNovText(color)} onChange={inputDescription} />
		</Wrapper>
	);
};

export default AuthorWriteIntroPopup;
