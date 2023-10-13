// import Box from '@mui/material/Box';   // material 폴더안의 Box만 사용 가능
import { Box, styled, Typography, useScrollTrigger } from '@mui/material';  // 이렇게 쓰면 material 폴더 안의 js 모든 파일 사용 가능

import Buttons from "components/controls/Button";

// Constant
import { CODE, LABEL } from "common"; 
import { useEffect, useState } from 'react';

const Whole = styled(Box)({
  // width: '1vw',
  height: 70,
  // border: '2px solid red',
  display: 'flex'
});

// 최상단 로고 감싸는 영역
const LogoBox = styled(Box)({
  width: 140,
  height: '100%',
  paddingLeft: 30,
  display: 'flex'
})

// 로고
const Logo = styled(Typography)({
  color: 'black',
  fontSize: 27,
  fontWeight: 'bolder',
  alignSelf: 'center'
})

const MenuBar = styled(Box)({
  flexGrow: 1,
  marginLeft: 'auto',
  display: 'flex'
})

const MenuBtnBox = styled(Box)({
  minWidth: 450,
  marginLeft: 'auto',
  marginRight: 50,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
})


const Header = (props) => {
  //로컬스토리지에 값이 담겨있는지 여부를 불리언 값으로 저장
  const isLogin = !!localStorage.getItem('id');
  const [login, setLogin] = useState(isLogin)
  // console.log(isLogin);

  // useEffect(() => {
  //   setLogin(isLogin);
  // },[login]);
 

  return (
    <Whole>
      <LogoBox>
        <Logo variant='h1'>NOVELY</Logo>
      </LogoBox>
      <MenuBar>
        <MenuBtnBox>
          {isLogin ? (
          <>
          <Buttons
            type={CODE.BUTTON.BASIC}
            name={LABEL.BUTTONS.ALL_NOVEL}
            margin={10}
          />
          <Buttons
            type={CODE.BUTTON.BASIC}
            name={LABEL.BUTTONS.FAVORITE_NOVEL}
            margin={10}
          />
          <Buttons
            type={CODE.BUTTON.BASIC}
            name={LABEL.BUTTONS.FAVORITE_AUTHOR}
            margin={10}
          />
          <Buttons
            type={CODE.BUTTON.BASIC}
            name={LABEL.BUTTONS.MY_INFO}
            margin={'10px 25px 10px 10px'}
          />
          <Buttons
            type={CODE.BUTTON.BORDER}
            name={LABEL.BUTTONS.LOGOUT}
            backgroundColor={'black'}
            color={'white'}
            width={83}
            showModal={props.showModal}
            closeModal={props.closeModal}
            changeState={props.changeState}
            logout={props.logout}
            // openLogin={props.openLogin}
            // openProfile={props.openProfile}
          />
          </>
        ) : (
        <>
          <Buttons
            type={CODE.BUTTON.BASIC}
            name={LABEL.BUTTONS.ALL_NOVEL}
            margin={10}
          />
          <Buttons
            type={CODE.BUTTON.BORDER}
            name={LABEL.BUTTONS.LOGIN}
            backgroundColor={'black'}
            color={'white'}
            width={83}
            showModal={props.showModal}
            changeState={props.changeState}
            // openLogin={props.openLogin}
            // openProfile={props.openProfile}
          />
        </>
        )
}
        </MenuBtnBox>
      </MenuBar>

    </Whole>
  )
}

export default Header;
