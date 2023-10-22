import { Box,  styled, Typography } from "@mui/material";

import Buttons from "components/controls/Button";

import Icons from "components/controls/IconRef";

import { CODE, LABEL, COLOR } from "common";

const Whole = styled(Box)({
	width: 211,
	borderRadius: 15,
	// border: "2px solid blue",
	display: "flex",
	flexDirection: "column",
  marginRight: 20,
  marginBottom: 15,
  "&:hover": {
    backgroundColor:'white',
    opacity: 0.7,
    cursor: 'pointer'
  }
});


const Cover = styled(Box)({
	width: "100%",
	minHeight: 290,
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
	fontSize: 15,
	paddingTop: 2,
  whiteSpace: 'noWrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const CountLike = styled(Typography)({
	fontSize: 11,
	display: 'flex',
  alignItems: 'center',
  marginRight: 2
});

const Description = styled(Typography)({
	fontSize: 11,
	color: COLOR.GRAY,
  whiteSpace: 'noWrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  // border: '1px solid black',
  height: 15
});

const TagBox = styled(Box)({
  // border: '1px solid black',
  marginTop: 3,
  // backgroundColor: "grey"
  minHeight: 60
})



const NovelCard = (props) => {
	return (
		<Whole onClick={props.onClick}>
			<Cover></Cover>
			<InfoBox>
				<InfoItemBox>
					<TitleBox>           
						<Title>{props.title}</Title>
					</TitleBox>
					<LikedBox>
						<CountLike>{props.like_count}</CountLike>
						<Icons type={CODE.ICON.FILLHEART} />
					</LikedBox>
				</InfoItemBox>
				<InfoItemBox>  
					<Description>{props.description}</Description>
				</InfoItemBox>
				<TagBox>
					<Buttons
						type={CODE.BUTTON.TAG}
						name={props.genre_1}
						backgroundColor={"orange"}
					/>
          {props.genre_2 && 
					<Buttons
						type={CODE.BUTTON.TAG}
						name={props.genre_2}
						backgroundColor={"skyBlue"}
					/>}
					<Buttons
						type={CODE.BUTTON.TAG}
						name={props.keyword_1}
						backgroundColor={"yellow"}
					/>
          {props.keyword_2 && 
					<Buttons
						type={CODE.BUTTON.TAG}
						name={props.keyword_2}
						backgroundColor={"grey"}
					/>}
          {props.keyword_3 && 
					<Buttons
						type={CODE.BUTTON.TAG}
						name={props.keyword_3}
						backgroundColor={"coral"}
					/>}
				</TagBox>
				{/* <InfoItemBox>
        <Icons
            type={CODE.ICON.SEARCH}
          />
          <Buttons
            type={CODE.BUTTON.BASIC}
            name={LABEL.BUTTONS.VIEWNOVEL}
            height={10}
            margin={'5px 0 0 -12px'}
          / >
     
        </InfoItemBox> */}
			</InfoBox>
		</Whole>
	);
};

export default NovelCard;
