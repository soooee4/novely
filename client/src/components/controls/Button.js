// MUI Package Module
import { Button, styled } from "@mui/material";

// Constant
import { CODE, COLOR } from "common";

// 기본 버튼
const BasicBtn = styled(Button)({
	color: COLOR.BLACK,
	borderRadius: 5,
	"&:hover": {
		backgroundColor: "transparent",
		fontWeight: "bolder",
		fontSize: 15,
	},
});

// 로그인, 로그아웃 버튼
const BorderBtn = styled(Button)({
	height: 10,
	fontWeight: 700,
	border: `1px solid ${COLOR.BLACK}`,
	borderRadius: 7,
	padding: 15,
	"&:hover": {
		fontWeight: "bolder",
		fontSize: 15,
		padding: "15px 0",
	},
});

// 태그 버튼
const TagBtn = styled(Button)({
	height: 15,
	borderRadius: 7,
	color: COLOR.BLACK,
	fontSize: 9,
	marginLeft: 5,
});

const Buttons = (props) => {
	if (props.type === CODE.BUTTON.BASIC) {
		return (
			<BasicBtn
				disableRipple
				onClick={() => {
					props.showModal && props.showModal();
					props.changeState && props.changeState();
					props.navigate && props.navigate();
					props.subNovelHandler && props.subNovelHandler();
					// props.vilidateTags && props.vilidateTags();
					props.nextBtnHandler && props.nextBtnHandler();
					props.subDescHandler && props.subDescHandler();
					props.isComplete && props.isComplete();
					props.goToWrite && props.goToWrite();
					props.AuthorNovelHandler && props.AuthorNovelHandler();
					props.setMainNovelData && props.setMainNovelData();
					props.postMainNovel && props.postMainNovel();
					props.isPost && props.isPost();
					props.sortPopular && props.sortPopular();
					props.sortLatest && props.sortLatest();
          props.likeSubNovel && props.likeSubNovel();
          props.postMainNovel && props.postMainNovel();
				}}
				style={{
					width: props.width,
					height: props.height,
					margin: props.margin,
					padding: props.padding,
					fontSize: props.fontSize,
					fontWeight: props.fontWeight,
				}}
			>
				{props.name}
			</BasicBtn>
		);
	} else if (props.type === CODE.BUTTON.TAG) {
		return (
			<TagBtn
				disableRipple
				onClick={() => {
					props.onSelectTags && props.onSelectTags();
					props.onClick && props.onClick();
				}}
				style={{
					backgroundColor: props.backgroundColor,
					margin: props.margin,
					padding: props.padding,
					fontSize: props.fontSize,
				}}
			>
				#{props.name}
			</TagBtn>
		);
	} else if (props.type === CODE.BUTTON.BORDER) {
		return (
			// 여러개의 함수 넣기
			<BorderBtn
				disableRipple
				onClick={() => {
					// props로 넘어온 값이 null, undefined가 아닐 경우에만 해당 함수 실행하도록 조건 부여
					props.showModal && props.showModal();
					props.changeState && props.changeState();
					props.onSubmit && props.onSubmit();
					props.logout && props.logout();
				}}
				style={{
					backgroundColor: props.backgroundColor,
					color: props.color,
					width: props.width,
					height: props.height,
					margin: props.margin,
					padding: props.padding,
					fontSize: props.fontSize,
				}}
			>
				{props.name}
			</BorderBtn>
		);
	}
};

export default Buttons;
