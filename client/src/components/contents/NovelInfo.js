import { Box, Button, styled, Typography } from "@mui/material";

import Buttons from "components/controls/Button";

import Icons from "components/controls/IconRef";

import { CODE, LABEL, COLOR, MESSAGE } from "common";
import { useState } from "react";

// 전체 영역
const Whole = styled(Box)({
	width: "100%",
	height: 150,
	display: "flex",
	margin: "0 auto",
	paddingTop: 20,
	// border: '1px solid orange'
});

// 좌측 소개글 및 이미지 영역
const InfoBox = styled(Box)({
	width: "70%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
});

// 우측 기한 표시 및 view 버튼 영역
const DateBox = styled(Box)({
	flexGrow: 1,
	height: "100%",
	display: "flex",
	flexDirection: "column",
});

// 소설 제목 영역
const TitleBox = styled(Box)({
	width: "100%",
	minHeight: 30,
	marginBottom: 5,
});

// 작가 이름 영역
const AuthorBox = styled(Box)({
	width: "100%",
	minHeight: 16,
});

// 소설 소개 영역
const DescriptionBox = styled(Box)({
	flexGrow: 1,
	marginTop: 12,
	marginBottom: 15,
});

// 제목 텍스트
const Title = styled(Typography)({
	fontSize: 23,
	fontWeight: 800,
});

// 작가 이름 텍스트
const Author = styled(Typography)({
	fontSize: 15,
	"&:hover": {
		cursor: "pointer",
		fontWeight: 900,
	},
});

// 소설 소개 텍스트
const Description = styled(Typography)({
	fontSize: 13,
	color: COLOR.GRAY,
});

// 기한 표시 텍스트
const DateInfo = styled(Typography)({
	fontSize: 18,
	marginTop: 30,
	marginBottom: 10,
	marginLeft: "auto",
});

//  view 버튼 영역
const NovelViewBox = styled(Box)({
	flex: 1,
	display: "flex",
	width: 70,
	marginLeft: "auto",
});

// 소설 축약 정보(소설 상세보기 컴포넌트의 헤더)
const NovelInfo = (props) => {

	return (
		<Whole>
			<InfoBox>
				<TitleBox>
					<Title>{props.title}</Title>
				</TitleBox>
				<AuthorBox>
          {props.main_author_id ?
          <> 
            <Author
              onClick={() => {
                props.showModal();
                props.setPopup("authorDetail");
                props.setAuthorId(props.main_author_id);
                props.setAuthorNickName(props.main_author_nickname);
              }}
            >
              By.{props.main_author_nickname}
            </Author>
            <Author
              onClick={() => {
                props.showModal();
                props.setPopup("authorDetail");
                props.setAuthorId(props.sub_author_id);
                props.setAuthorNickName(props.sub_author_nickname);
              }}
            >
              By.{props.sub_author_nickname}
            </Author>
          </>
          :
          <Author
            onClick={() => {
              props.showModal();
              props.setPopup("authorDetail");
              props.setAuthorId(props.created_user)
              props.setAuthorNickName(props.user_nickname);
          }}
        >
          By.{props.user_nickname}
        </Author>
        }
				</AuthorBox>
				<DescriptionBox>
					<Description>{props.description}</Description>
				</DescriptionBox>
			</InfoBox>

			<DateBox>
				{props.complete_seqno ? (
					<DateInfo>{MESSAGE.DDAY_COMPLETE}</DateInfo>
				) : (
					// !추후 실제 날짜 계산해서 넣어놓기
					<DateInfo>마감이 3일 남았어요</DateInfo>
				)}
				<NovelViewBox
					// onClick={props.showModal}
					onClick={() => {
						props.showModal();
            props.complete_seqno !== undefined ? props.setPopup("viewComNov") : props.setPopup("viewIncomNov")            
					}}
				>
					<Icons type={CODE.ICON.SEARCH} />
					<Buttons
						type={CODE.BUTTON.BASIC}
						name={LABEL.BUTTONS.VIEWNOVEL}
						height={10}
						margin={"5px 0 0 -12px"}
					/>
				</NovelViewBox>
			</DateBox>
		</Whole>
	);
};

export default NovelInfo;
