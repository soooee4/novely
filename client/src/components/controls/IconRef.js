// MUI Package Module
import styled from '@emotion/styled';
import {
  Favorite,
  FavoriteBorder,
  Close,
  Pets,
  Search
} from '@mui/icons-material'

// Constant
import { CODE, COLOR } from 'common'; 

// 찜 눌렀을 때 하트 아이콘
const FillHeart = styled(Favorite)({
    color: COLOR.HEART_PINK,
      cursor: 'pointer'
})

// 찜 누르기 전 빈 하트
const Heart = styled(FavoriteBorder)({
    color: COLOR.HEART_PINK,
    cursor: 'pointer'
  }
)

// 닫기 아이콘
const CloseBtn = styled(Close)({
    cursor: 'pointer',
})

// 고양이 발바닥 아이콘
const Cat = styled(Pets)({
    cursor: 'pointer'
})

// 돋보기 아이콘
const View = styled(Search)({
    cursor: 'pointer',
})

const Icons = (props) => {
    if (props.type === CODE.ICON.FILLHEART) {
        return (
          <FillHeart></FillHeart>
        )
    } else if (props.type === CODE.ICON.HEART) {
        return (
          <Heart></Heart>
        )
    } else if (props.type === CODE.ICON.CLOSE) {
        return (
          <CloseBtn></CloseBtn>
        )
    } else if (props.type === CODE.ICON.CAT) {
      return (
        <Cat></Cat>
      )
    } else if (props.type === CODE.ICON.SEARCH) {
      return (
        <View></View>
      )
    }
}
export default Icons;