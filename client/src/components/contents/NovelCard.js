import { Box, styled, Typography } from "@mui/material";

import Buttons from "components/controls/Button";

import Icons from "components/controls/Icons";

import { CODE, COLOR } from "common";

import { deleteData, postData } from "common/communication";
import { useEffect } from "react";

// 카드 컴포넌트 전체 영역
const Whole = styled(Box)({
	width: 211,
	borderRadius: 15,
  // boxSizing:"border-box",
  // border: "3px solid black",
	display: "flex",
	flexDirection: "column",
	marginRight: 20,
	marginBottom: 15,

});

// 소설 커버 이미지 영역
const Cover = styled(Box)({
	width: "100%",
	minHeight: 290,
	borderRadius: 15,
	backgroundColor: COLOR.PURPLE,
	marginBottom: 9,
  "&:hover": {
		opacity: 0.7,
		cursor: "pointer",
	},
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

const NovelCard = (props) => {

  // 하트 아이콘 눌렀을 때 실행될 기능 함수
 
  const pickNovel = () => {
    if (props.pick_yn === "N") {
      console.log('pickYn is N')
      postData('novel/postPickNovel', {
        main_novel_seqno: props.main_seqno,
        user_id: props.user_id,
      })
      .then((data) => {
        alert(data)
        props.setIsPick(true)
      })
      .catch((err) => {
        console.log(err);
      })
    } else if (props.pick_yn === "Y") {
      console.log('pickYn is Y')
      deleteData('novel/deletePickNovel', {
        main_novel_seqno: props.main_seqno,
        user_id: props.user_id,
      })
      .then((data) => {
        alert(data)
        props.setIsPick(false)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }




	return (
		<Whole >
			<Cover onClick={props.onClick} ></Cover>
			<InfoBox>
				<InfoItemBox>
					<TitleBox>
						<Title>{props.title}</Title>
					</TitleBox>
					{props.like_count && (
						<LikedBox>
							<CountLike>{props.like_count}</CountLike>
							{props.pick_yn === "Y" ? 
              <Icons 
                type={CODE.ICON.FILLHEART}
                // 하트 아이콘 눌렀을 때 실행될 기능
                pickNovel={pickNovel}
              />
              :
              <Icons 
              type={CODE.ICON.HEART}
              // 하트 아이콘 눌렀을 때 실행될 기능
              pickNovel={pickNovel}
            />
          }
						</LikedBox>
					)}
				</InfoItemBox>
				<InfoItemBox>
					<Description>{props.description}</Description>
				</InfoItemBox>
				{props.genre_1 && (
					<TagBox>
						<Buttons
							type={CODE.BUTTON.TAG}
							name={props.genre_1}
							backgroundColor={`#${props.genre_1_color}`}
						/>
						{props.genre_2 && (
							<Buttons
								type={CODE.BUTTON.TAG}
								name={props.genre_2}
								backgroundColor={`#${props.genre_2_color}`}
							/>
						)}
						<Buttons
							type={CODE.BUTTON.TAG}
							name={props.keyword_1}
							backgroundColor={`#${props.keyword_1_color}`}
						/>
						{props.keyword_2 && (
							<Buttons
								type={CODE.BUTTON.TAG}
								name={props.keyword_2}
								backgroundColor={`#${props.keyword_2_color}`}
							/>
						)}
						{props.keyword_3 && (
							<Buttons
								type={CODE.BUTTON.TAG}
								name={props.keyword_3}
								backgroundColor={`#${props.keyword_3_color}`}
							/>
						)}
					</TagBox>
				)}
			</InfoBox>
		</Whole>
	);
};

export default NovelCard;
