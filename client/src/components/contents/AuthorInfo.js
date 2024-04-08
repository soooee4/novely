// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

/** STYLE 정의 */
// 작가 이름
const AuthorName = styled(Typography)({
  fontSize: 18,
  textAlign: 'center',
})

// 작가 한줄 소개
const AuthorMessage = styled(Typography)({
  fontSize: 11,
  marginTop: 5,
  marginBottom: 15,
  textAlign: "center"
})

/** 작가 상세정보 팝업에 들어가는 작가 소개 컴포넌트(작가 프로필 이미지, 닉네임, 소개글 포함) */
const AuthorInfo = (props) => {
  return (
		<Box
			sx={{
				width: 280,
				paddingTop: 5,
			}}
		>
			<Box
				sx={{
					width: 180,
					height: 180,
					backgroundImage: `url(${process.env.REACT_APP_IMAGE_DIRECTORY}/${props.user_image})`,
					backgroundSize: "cover",
					borderRadius: "50%",
					margin: "0 auto",
					marginTop: 4,
					marginBottom: 2,
				}}
			/>
			{/* !닉네임으로 변경 */}
			<AuthorName>{props.authorNickname}</AuthorName>
			<AuthorMessage>{props.authorInfo}</AuthorMessage>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
			></Box>
		</Box>
	);
}

export default AuthorInfo;