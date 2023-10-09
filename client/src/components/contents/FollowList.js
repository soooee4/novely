import { Box, styled, Typography, Button } from "@mui/material";

// Button Component
import Buttons from "components/controls/Button";

import { CODE, LABEL, COLOR } from "common"; 

// 리스트 전체 영역
const ListBox = styled(Box)({
  height: 50,
  width: '87%',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center'
})

// 리스트 내부 작가 이름 텍스트 영역
const AuthorName = styled(Typography)({
  fontSize: 15,
  width: 200,
  whiteSpace: 'noWrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

// 리스트 내부 작가 소개 텍스트 영역
const AuthorInfo = styled(Typography)({
  fontSize: 10,
  color: COLOR.GRAY,
  flexGrow: 1,
  whiteSpace: 'noWrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginRight: 30
})

const FollowList = () => {

  return (
    <ListBox>
      <AuthorName>작가이름 고애df앵야ㅑ</AuthorName>
      <AuthorInfo>작가 소개소갯고개소개소개</AuthorInfo>
      <Buttons
          type={CODE.BUTTON.BORDER}
          name={LABEL.BUTTONS.UNFOLLOW}
          backgroundColor={'White'}
          color={'Black'}
      />
    </ListBox>
  )
}

export default FollowList;