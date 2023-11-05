import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import Box from '@mui/material/Box';   // material 폴더안의 Box만 사용 가능
import { Box, styled, Typography, useScrollTrigger } from "@mui/material"; // 이렇게 쓰면 material 폴더 안의 js 모든 파일 사용 가능

import Buttons from "components/controls/Button";

// Constant
import { CODE, LABEL, MESSAGE } from "common";

// Popup Component
// import ToastPopup from "components/popup/ToastPopup";
import ModalPopup from "components/popup/ModalPopup";
import LoginPopup from "components/popup/LoginPopup";
import JoinPopup from "components/popup/JoinPopup";
import EditProfilePopup from "components/popup/EditProfilePopup";
// import ProfileAddPopup from "components/popup/ProfileAddPopup";

// 전체 영역
const Whole = styled(Box)({
	height: 70,
	display: "flex",
});

// 최상단 로고 감싸는 영역
const LogoBox = styled(Box)({
	height: "100%",
	paddingLeft: "8%",
	display: "flex",
});

// 로고
const Logo = styled(Typography)({
	color: "black",
	fontSize: 27,
	fontWeight: "bolder",
	alignSelf: "center",
});

// 로고 제외 전체 영역
const MenuBar = styled(Box)({
	flexGrow: 1,
	marginRight: "5%",
	justifyContent: "flex-end",
	display: "flex",
});

// 닉네임 포함 환영문구 영역
const WelcomeMsg = styled(Typography)({
	color: "black",
	fontSize: 15,
	marginLeft: "auto",
	fontWeight: "bolder",
	alignSelf: "center",
	marginRight: 10,
});

// 메뉴 버튼 영역
const MenuBtnBox = styled(Box)({
	marginRight: 50,
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center"
});

const Header = () => {
	// 구조 분해 할당 이용하여 props 분해
	// const { profile, logout, setProfile } = props;

	const [modal, setModal] = useState(false);
	const [popup, setPopup] = useState("login");
	const [isLogin, setIsLogin] = useState(localStorage.getItem("profile") ? true : false);
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")));
	const nickname = profile && profile.user_nickname;
  
  const logout = () => {
    localStorage.removeItem("profile");
    window.location.reload();
  };

	// 모달창 닫는 함수 -----
	const closeModal = () => {
		setModal(false);
	};

	// 모달창 바꿔주는 함수 조건식 -----
	const popupChange = () => {
		if (popup === "login") {
			return (
				<LoginPopup
					changeState={() => setPopup("join")}
					closeModal={closeModal}
					isLogin={() => setIsLogin(true)}
				/>
			);
		} else if (popup === "join") {
			return <JoinPopup profile={profile} setProfile={setProfile} />;
		} else if (popup === "editProfile") {
			return (
				<EditProfilePopup
					profile={profile}
					setProfile={setProfile}
					closeModal={closeModal}
				/>
			);
		}
	};

  const navigate = useNavigate();

	return (
		<Whole>
			<LogoBox>
				<Logo variant="h1" onClick={() => navigate('/')}>NOVELY</Logo>
			</LogoBox>
			<MenuBar>
				{profile && (
					<WelcomeMsg>
						{profile.user_reg_dv === "G" ? "예비작가" : "작가"}&nbsp;
						{nickname}님 👋
					</WelcomeMsg>
				)}
				<MenuBtnBox>
					{/* 비로그인 상태 */}
					{!profile ? (
						<Buttons
							type={CODE.BUTTON.BORDER}
							name={LABEL.BUTTONS.LOGIN}
							backgroundColor={"black"}
							color={"white"}
							width={83}
							showModal={() => setModal(true)}
							changeState={() => setPopup("login")}
							// openLogin={openLogin}
							// openProfile={openProfile}
						/>
					) : (
						// 일반 유저 로그인 상태
						<>
							<Buttons
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.ALL_NOVEL}
								margin={10}
                navigate={() => navigate('/')}
							/>
							<Buttons
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.FAVORITE_NOVEL}
								margin={10}
							/>
							{/* 권한에 따라 내 정보, 내 작품 메뉴 변경 */}
							{profile.user_reg_dv === "W" && (
								<>
									<Buttons
										type={CODE.BUTTON.BASIC}
										name={LABEL.BUTTONS.MY_INFO}
										margin={"10px 25px 10px 10px"}
									/>
									<Buttons
										type={CODE.BUTTON.BASIC}
										name={LABEL.BUTTONS.MY_NOVEL}
										margin={10}
									/>
								</>
							)}
							<Buttons
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.MY_INFO}
								margin={"10px 25px 10px 10px"}
								showModal={() => setModal(true)}
								changeState={() => setPopup("editProfile")}
							/>
							<Buttons
								type={CODE.BUTTON.BORDER}
								name={LABEL.BUTTONS.LOGOUT}
								backgroundColor={"black"}
								color={"white"}
								width={83}
								logout={logout}
								// openLogin={openLogin}
								// openProfile={openProfile}
							/>
						</>
					)}
				</MenuBtnBox>
			</MenuBar>
			<ModalPopup
				open={modal}
				width={600}
				height={400}
				onClose={() => setModal(false)}
				popupState={popup}
			>
				{popupChange()}
			</ModalPopup>
		</Whole>
	);
};

export default Header;
