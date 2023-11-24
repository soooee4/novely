// MUI Package Module
import styled from "@emotion/styled";
import {
	Favorite,
	FavoriteBorder,
	Close,
	Pets,
	Search,
	ThumbUpOffAlt,
	ThumbUpAlt,
} from "@mui/icons-material";

// Constant
import { CODE, COLOR } from "common";

// 찜 눌렀을 때 하트 아이콘
const FillHeart = styled(Favorite)({
	color: COLOR.HEART_PINK,
	cursor: "pointer",
});

// 찜 누르기 전 빈 하트
const Heart = styled(FavoriteBorder)({
	color: COLOR.HEART_PINK,
	cursor: "pointer",
});

// 좋아요 누르기 전 버튼
const Like = styled(ThumbUpOffAlt)({
	color: COLOR.MUSTARD,
	cursor: "pointer",
});

// 좋아요 눌렀을 때 버튼
const Liked = styled(ThumbUpAlt)({
	color: COLOR.MUSTARD,
	cursor: "pointer",
});

const _getIconComp = (type) => {
	let Component;
	switch (type) {
		case CODE.ICON.FILLHEART:
			Component = FillHeart;
			break;
		case CODE.ICON.HEART:
			Component = Heart;
			break;
		case CODE.ICON.CLOSE:
			Component = Close;
			break;
		case CODE.ICON.CAT:
			Component = Pets;
			break;
		case CODE.ICON.SEARCH:
			Component = Search;
			break;
		case CODE.ICON.LIKE:
			Component = Like;
			break;
		case CODE.ICON.LIKED:
			Component = Liked;
			break;
	}
	return Component;
};

const Icons = (props) => {
	const Icon = _getIconComp(props.type);

	return (
		<Icon
			sx={{
				color: props.color !== undefined ? props.color : "transparent",
				":hover": {
					cursor: "pointer",
					color: props.h_color,
				},
			}}
			type={props.type}
			onClick={() => {
				props.pickNovel && props.pickNovel();
			}}
		/>
	);
};
export default Icons;
