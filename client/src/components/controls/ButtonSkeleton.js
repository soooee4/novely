// MUI Package Module
import { Box, Button, styled } from '@mui/material';

// Constant
import { CODE, COLOR } from 'common'; 

import Skeleton from "react-loading-skeleton";
 
// 기본 버튼
const BasicBtn = styled(Button)({
    color: COLOR.BLACK,
    borderRadius: 5
});

// 팔로우 버튼
const BorderBtn = styled(Button)({
    height: 10,
    fontWeight: 700,
    border: `1px solid ${COLOR.BLACK}`,
    borderRadius: 7,
    padding: 15
}); 

// 태그 버튼
const TagBtn = styled(Box)({
    width: 60,
    height: 12,
    borderRadius: 7,
    color: COLOR.BLACK,
    fontSize: 9,
    marginLeft: 5,
    overflow:'hidden'
});



const ButtonSkeleton = (props) => {
  if (props.type === CODE.BUTTON.BASIC) {
    return (
      <BasicBtn >
        <Skeleton />
      </BasicBtn>
    )
  } else if (props.type === CODE.BUTTON.TAG) {
    return (
      <TagBtn>
        <Skeleton height="100%" style={{display: 'block'}}/>
      </TagBtn>
    )
    }}
    
export default ButtonSkeleton;