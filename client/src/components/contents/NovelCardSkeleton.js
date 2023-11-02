import { Box, styled, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";


import Buttons from "components/controls/Button";

import Icons from "components/controls/IconRef";

import { CODE, COLOR } from "common";

import { getData } from "common/communication";
import ButtonSkeleton from "components/controls/ButtonSkeleton";

// 카드 컴포넌트 전체 영역
const Whole = styled(Box)({
	width: 211,
	borderRadius: 15,

	display: "flex",
	flexDirection: "column",
	marginRight: 20,
	marginBottom: 15,
	"&:hover": {
		backgroundColor: "white",
		opacity: 0.7,
		cursor: "pointer",
	},
});

// 소설 커버 이미지 영역
const Cover = styled(Box)({
	width: "100%",
	minHeight: 290,
	borderRadius: 15,
	backgroundColor: COLOR.PURPLE,
	marginBottom: 9,
  overflow:"hidden"
});

// 소설 설명 영역 (제목, 한줄소개, 태그, 좋아요)
const InfoBox = styled(Box)({
	flex: "1",
	display: "flex",
	flexDirection: "column",
});

// 제목, 한줄소개, 좋아요 영역
const InfoItemBox = styled(Box)({
	flex: "1",
	display: "flex",
	paddingLeft: 5,
});

// 제목 영역
const TitleBox = styled(Box)({
	width: "80%",
});

// 좋아요 영역
const LikedBox = styled(Box)({
	flex: "1",
	display: "flex",
});

// 소설 제목
const Title = styled(Typography)({
	fontSize: 15,
	paddingTop: 2,
	whiteSpace: "noWrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
});

// 좋아요 수
const CountLike = styled(Typography)({
	fontSize: 11,
	display: "flex",
	alignItems: "center",
	marginRight: 2,
});

// 소설 한줄소개
const Description = styled(Typography)({
	fontSize: 11,
	color: COLOR.GRAY,
	whiteSpace: "noWrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	height: 15,
});

// 태그 영역
const TagBox = styled(Box)({
	marginTop: 3,
	minHeight: 60,
});

const NovelCardSkeleton = (props) => {

	return (
		<Whole >
			<Cover>
        <Skeleton height={"100%"} style={{display:'block'}}/>
      </Cover>
			<InfoBox>
				<InfoItemBox>
					<TitleBox>
						<Title style={{width:"200px"}}>
              <Skeleton width={200}/>
            </Title>
					</TitleBox>
						
				</InfoItemBox>
				<InfoItemBox>
					<Description>
            <Skeleton width={200}/>
          </Description>
				</InfoItemBox>
					<TagBox>
          <ButtonSkeleton type={CODE.BUTTON.TAG} />
					</TagBox>
			</InfoBox>
		</Whole>
	);
};

export default NovelCardSkeleton;
