// import Box from '@mui/material/Box';   // material 폴더안의 Box만 사용 가능
import { Box, styled, Typography, useScrollTrigger } from "@mui/material"; // 이렇게 쓰면 material 폴더 안의 js 모든 파일 사용 가능

import Buttons from "components/controls/Button";

// Constant
import { CODE, LABEL } from "common";
import { useEffect, useState } from "react";

const Whole = styled(Box)({
	// width: '1vw',
	height: 70,
	// border: '2px solid red',
	display: "flex",
});

// 최상단 로고 감싸는 영역
const LogoBox = styled(Box)({
	width: 140,
	height: "100%",
	paddingLeft: 30,
	display: "flex",
});

// 로고
const Logo = styled(Typography)({
	color: "black",
	fontSize: 27,
	fontWeight: "bolder",
	alignSelf: "center",
});

const MenuBar = styled(Box)({
	flexGrow: 1,
	marginLeft: "auto",
	display: "flex",
});

const MenuBtnBox = styled(Box)({
	minWidth: 450,
	marginLeft: "auto",
	marginRight: 50,
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
});

const Header = (props) => {
	// 로컬스토리지에 값이 담겨있는지 여부를 불리언 값으로 저장 
	// const isLogin = !!localStorage.getItem("id");
	// const [login, setLogin] = useState(isLogin);

//   console.log('this is header component rerendering')

//   // const [isLogin, setIsLogin] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem('id')) {
//       setIsLogin(true);
//     } else {
//       setIsLogin(false);
//     }
//   }, []);

	return (
		<Whole>
			<LogoBox>
				<Logo variant="h1">NOVELY</Logo>
			</LogoBox>
			<MenuBar>
				<MenuBtnBox>
					{/* 지금 현재 조건은 이 헤더 페이지내에서 로컬스토리지를 조회해 그 값을 기반으로 버튼을 어떤걸 보여줄 지 정했잖아요?
					근데 메인에서 로그인/로그아웃 상태를 공유해주기로 했으니 그 조건들이 다 필요가 없어졌습니다
					이 헤더 페이지에서 단독적으로 로컬스토리지를 조회해 그 값을 보는게 아니라
					가장 최상단 부모에서 공유되는 값을 모달이건, 컴포넌트건 모두가 공유할겁니다  */}
					{/* 프랍스로 넘어왔으니 프랍스.isLogin 해줍니다 */}
					{/* 위에 유즈이펙트랑 스테이트 주석처리 하겠습니다 */}
					{props.isLogin ? ( 
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
								margin={"10px 25px 10px 10px"}
							/>
							<Buttons
								type={CODE.BUTTON.BORDER}
								name={LABEL.BUTTONS.LOGOUT}
								backgroundColor={"black"}
								color={"white"}
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
								backgroundColor={"black"}
								color={"white"}
								width={83}
								showModal={props.showModal}
								changeState={props.changeState}
								// openLogin={props.openLogin}
								// openProfile={props.openProfile}
							/>
						</>
					)}
				</MenuBtnBox>
			</MenuBar>
		</Whole>
	);
};

export default Header;
