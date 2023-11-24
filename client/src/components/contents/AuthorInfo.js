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
  fontSize: 10,
  paddingLeft: 25,
  paddingRight: 25,
  marginTop: 5,
  marginBottom: 15
})

/** 작가 상세정보 팝업에 들어가는 작가 소개 컴포넌트(작가 프로필 이미지, 닉네임, 소개글 포함) */
const AuthorInfo = (props) => {

  return (
    <Box
      sx={{
        width: 280,
        height: 380,
        marginBottom: 10
      }}
    >
      <Box
        sx={{
          width: 180,
          height: 180,
          backgroundImage: `url(http://172.30.1.35:8080/profile/${props.user_image})`,
          backgroundSize: "cover",
          borderRadius: '50%',
          margin: '0 auto',
          marginTop: 4,
          marginBottom: 2
        }}
       />
      {/* !닉네임으로 변경 */}
      <AuthorName>{props.authorNickName}</AuthorName>
      <AuthorMessage>작가 소갯말</AuthorMessage>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        >
      </Box>
    </Box>
  );
}

export default AuthorInfo;