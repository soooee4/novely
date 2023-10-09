import { Box,  styled, Typography } from "@mui/material";

import Buttons from "components/controls/Button";

import Icons from "components/controls/IconRef";

import { CODE, LABEL, COLOR } from "common";

const Whole = styled(Box)({
	width: 230,
	height: 380,
	borderRadius: 15,
	// border: "2px solid blue",
	display: "flex",
	flexDirection: "column",
  marginRight: 20,
  ":first-child": {
    marginLeft: 40
  },
  ":last-child": {
    marginRight: 40
  }
});

const Cover = styled(Box)({
	width: "100%",
	height: 290,
	borderRadius: 15,
	backgroundColor: COLOR.PURPLE,
  marginBottom: 9
});

const InfoBox = styled(Box)({
	flex: "1",
	// border: "2px solid red",
	display: "flex",
	flexDirection: "column",
});

const InfoItemBox = styled(Box)({
	flex: "1",
	// border: "1px solid red",
	display: "flex",
	paddingLeft: 5,
});

const TitleBox = styled(Box)({
	// border: "1px solid green",
	width: "80%",
});

const LikedBox = styled(Box)({
	// border: "1px solid blue",
	flex: "1",
	display: "flex",
});

const Title = styled(Typography)({
	fontSize: 13,
	paddingTop: 2,
  whiteSpace: 'noWrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const CountLike = styled(Typography)({
	fontSize: 8,
	paddingTop: 5,
});

const Description = styled(Typography)({
	fontSize: 8,
	color: COLOR.GRAY,
  whiteSpace: 'noWrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const TagBox = styled(Box)({
  // border: '1px solid black',
  marginBottom: 7
})



const NovelCard = () => {
	return (
		<Whole>
			<Cover></Cover>
			<InfoBox>
				<InfoItemBox>
					<TitleBox>
						<Title>소설 제목 웅앵입니다 마라탕 마라마라마람라마라마라마라마람라ㅏ마람라</Title>
					</TitleBox>
					<LikedBox>
						<CountLike>255</CountLike>
						<Icons type={CODE.ICON.FILLHEART} />
					</LikedBox>
				</InfoItemBox>
				<InfoItemBox>
					<Description>소설에 대한 설명이에요 소설에 대한 설명이에요 소설에 대한 설명이에요오오오 소설에대한설명이에요오오오 </Description>
				</InfoItemBox>
				<TagBox>
					<Buttons
						type={CODE.BUTTON.TAG}
						name={LABEL.BUTTONS.FUNNY}
						backgroundColor={"orange"}
					/>
					<Buttons
						type={CODE.BUTTON.TAG}
						name={LABEL.BUTTONS.SAD}
						backgroundColor={"skyBlue"}
					/>
					<Buttons
						type={CODE.BUTTON.TAG}
						name={LABEL.BUTTONS.HORROR}
						backgroundColor={"coral"}
					/>
					<Buttons
						type={CODE.BUTTON.TAG}
						name={LABEL.BUTTONS.FANTASY}
						backgroundColor={"lightGreen"}
					/>
				</TagBox>
				<InfoItemBox>
        <Icons
            type={CODE.ICON.SEARCH}
          />
          <Buttons
            type={CODE.BUTTON.BASIC}
            name={LABEL.BUTTONS.VIEWNOVEL}
            height={10}
            margin={'5px 0 0 -12px'}
          ></Buttons>
     
        </InfoItemBox>
			</InfoBox>
		</Whole>
	);
};

export default NovelCard;
