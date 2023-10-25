// import Box from '@mui/material/Box';   // material 폴더안의 Box만 사용 가능
import { Box, styled, Typography, useScrollTrigger } from "@mui/material"; // 이렇게 쓰면 material 폴더 안의 js 모든 파일 사용 가능

import Buttons from "components/controls/Button";

// Constant
import { CODE, LABEL } from "common";
import { useEffect, useState } from "react";

// Popup Component
// import ToastPopup from "components/popup/ToastPopup";
import ModalPopup from "components/popup/ModalPopup";
import LoginPopup from "components/popup/LoginPopup";
import JoinPopup from "components/popup/JoinPopup";
import EditProfilePopup from "components/popup/EditProfilePopup";
// import ProfileAddPopup from "components/popup/ProfileAddPopup";

const Whole = styled(Box)({
	// width: '1vw',
	height: 70,
	// border: '2px solid red',
	display: "flex",
});

// 최상단 로고 감싸는 영역
const LogoBox = styled(Box)({
	// width: 140,
	height: "100%",
	paddingLeft: '8%',
	display: "flex",
  // border: '2px solid red',
});

// 로고
const Logo = styled(Typography)({
	color: "black",
	fontSize: 27,
	fontWeight: "bolder",
	alignSelf: "center",
  // marginLeft: '30%',

});

const MenuBar = styled(Box)({
	flexGrow: 1,
  marginRight: '5%',
  justifyContent: "flex-end",
	display: "flex",
  // border:"2px solid blue"
});

const WelcomeMsg = styled(Typography)({
	color: "black",
	fontSize: 15,
  // border:"2px solid blue",
  marginLeft:'auto',
	fontWeight: "bolder",
	alignSelf: "center",
  marginRight: 10

});

const MenuBtnBox = styled(Box)({
	// minWidth: 450,
	// marginLeft: "auto",
	marginRight: 50,
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
  // border:"2px solid red"
});


const Header = (props) => {
  const [modal, setModal] = useState(false);
	const [popup, setPopup] = useState("login");
  const [isLogin, setIsLogin] = useState(
		localStorage.getItem("id") ? true : false
	);

  const closeModal = () => {
		setModal(false);
	};

  const popupChange = () => {
		if (popup === "login") {
			return (
				<LoginPopup
					changeState={() => setPopup("join")}
					closeModal={closeModal}
					// logout={logout}
					isLogin={() => setIsLogin(true)}
				/>
			);
		} else if (popup === "join") {
			return <JoinPopup  />;
		} else if (popup === "editProfile") {
			return <EditProfilePopup />;
		}
	};

  // console.log(props.profile);

  // const profile = JSON.parse(localStorage.getItem("profile"));

  const nickname = props.profile && props.profile.user_nickname;
  // console.log(nickname,3333)

	return (
		<Whole>
			<LogoBox>
				<Logo variant="h1">NOVELY</Logo>
			</LogoBox>
			<MenuBar>
        {props.profile && 
          <WelcomeMsg>
            {props.profile.user_reg_dv === 'G' ? '예비작가' : '작가'}&nbsp;
            {nickname}님 👋
          </WelcomeMsg>
        }
				<MenuBtnBox>
          {/* 비로그인 상태 */}
					{!props.profile ?  
            <Buttons
              type={CODE.BUTTON.BORDER}
              name={LABEL.BUTTONS.LOGIN}
              backgroundColor={"black"}
              color={"white"}
              width={83}
              showModal={() => setModal(true)}
              changeState={()=> setPopup("login")}
              // openLogin={props.openLogin}
              // openProfile={props.openProfile}
          />
          :
          // 일반 유저 로그인 상태
          props.profile.user_reg_dv === 'G' ?
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
							{/* <Buttons
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.FAVORITE_AUTHOR}
								margin={10}
							/> */}
							<Buttons
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.MY_INFO}
								margin={"10px 25px 10px 10px"}
                showModal={() => setModal(true)}
                changeState={()=> setPopup("editProfile")}
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
            :
            <>
              <Buttons
                type={CODE.BUTTON.BASIC}
                name={LABEL.BUTTONS.ALL_NOVEL}
                margin={10}
              />
              <Buttons
                type={CODE.BUTTON.BASIC}
                name={LABEL.BUTTONS.MY_NOVEL}
                margin={10}
              />
              <Buttons
                type={CODE.BUTTON.BASIC}
                name={LABEL.BUTTONS.FAVORITE_NOVEL}
                margin={10}
              />
              <Buttons
                type={CODE.BUTTON.BASIC}
                name={LABEL.BUTTONS.MY_INFO}
                margin={"10px 25px 10px 10px"}
                showModal={props.showModal}
                closeModal={props.closeModal}
                changeState={props.changeState}
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
          }

				</MenuBtnBox>
			</MenuBar>
      <ModalPopup
				open={modal}
				width={600}
				height={400}
				onClose={() => setModal(false)}
        popupState={popup}
        // profile={props.profile}
			>
				{popupChange()}
			</ModalPopup>
		</Whole>
	);
};

export default Header;
