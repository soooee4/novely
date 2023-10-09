import { Box, styled, Typography } from "@mui/material";

import Buttons from "components/controls/Button";

import { CODE, LABEL, COLOR } from 'common'; 

// 작가 이름 텍스트 영역
const AuthorName = styled(Typography)({
  fontSize: 18,
  textAlign: 'center',
})

// 작가 한줄 소개 텍스트 영역
const AuthorMessage = styled(Typography)({
  fontSize: 10,
  paddingLeft: 25,
  paddingRight: 25,
  marginTop: 5,
  marginBottom: 15
})

const AuthorInfo = () => {
  
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
          backgroundColor:  COLOR.MUSTARD,
          borderRadius: '50%',
          margin: '0 auto',
          marginTop: 4,
          marginBottom: 2
        }}
       />
      <AuthorName>작가이름</AuthorName>
      <AuthorMessage>작가 소갯말 웅앵옹앵웅앵옹앵웅앵옹앵웅앵옹앵웅앵옹앵웅앵옹앵웅앵옹앵웅앵옹앵웅앵옹앵웅앵옹앵웅앵옹앵웅앵옹앵웅앵옹앵</AuthorMessage>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        >
        <Buttons
          type={CODE.BUTTON.BORDER}
          name={LABEL.BUTTONS.FOLLOW}
          backgroundColor={'Black'}
          color={'White'}
          width={160}
          />
      </Box>
    </Box>
  );
}

export default AuthorInfo;