// React Package Module
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import Buttons from "components/controls/Button";

// Popup Component
import ModalPopup from "components/popup/ModalPopup";
import LoginPopup from "components/popup/LoginPopup";
import JoinPopup from "components/popup/JoinPopup";
import EditProfilePopup from "components/popup/EditProfilePopup";

// Constant
import { CODE, LABEL, MESSAGE } from "common";

// Util
import { modalWidth, modalHeight } from "common/util";

/** STYLE 정의 */
// 전체 영역
const Whole = styled(Box)({
	height: 70,
  paddingLeft: 120,
  margin: "10px 0",
	display: "flex",
});

// 최상단 로고 감싸는 영역
const LogoBox = styled(Box)({
	height: "100%",
	display: "flex",
});

// 로고
const Logo = styled(Typography)({
	color: "black",
	fontSize: 27,
	fontWeight: "bolder",
	alignSelf: "center",
	cursor: "pointer",
});

// 로고 제외 전체 영역
const MenuBar = styled(Box)({
	justifyContent: "flex-end",
	display: "flex",
  marginLeft: 600,
  paddingRight: 40,
  minWidth: 500,
});

// 닉네임 포함 환영문구 영역
const WelcomeMsg = styled(Typography)({
	color: "black",
	fontSize: 15,
	fontWeight: "bolder",
	alignSelf: "center",
  minWidth: 200,
});

// 메뉴 버튼 영역
const MenuBtnBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

/** 모든 페이지에 고정적으로 위치하는 헤더 (메뉴 버튼 포함) */
const Header = () => {
	const [modal, setModal] = useState(false);        // 모달 oepn 여부
	const [popup, setPopup] = useState("login");       // popup 상태값
	const [isLogin, setIsLogin] = useState(localStorage.getItem("profile") ? true : false);   // 로그인 여부
	const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")));   // 로컬스토리지에 저장된 사용자 정보

	const nickname = profile && profile.user_nickname;
  	const navigate = useNavigate();

	const goToPage = (url) => {
		navigate(url);
	};

	const logout = () => {
		localStorage.removeItem("profile");
		goToPage("/");
		window.location.reload();
	};

	// 모달창 닫는 함수
	const closeModal = () => {
		setModal(false);
	};

	// 팝업 상태값 변경
	const popupChange = () => {
		// 로그인
		if (popup === "login") {
			return (
				<LoginPopup
					changeState={() => setPopup("join")}
					isLogin={() => setIsLogin(true)}
				/>
			);

			// 회원가입
		} else if (popup === "join") {
			return (
        <JoinPopup 
          profile={profile} 
          setProfile={setProfile}
					changeState={() => setPopup("login")}
        />
      );

			// 프로필 수정
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

  // 현재 컴포넌트 URL 경로(새로고침 시 선택한 탭 메뉴 bolder 유지를 위해 현재 경로를 참조: 새로고침 시 state는 초기화)
  const currentPath = window.location.pathname;

	return (
		<Whole>
			<LogoBox>
				<Logo variant="h1" onClick={() => navigate("/")}>
					NOVELY
				</Logo>
			</LogoBox>
			<MenuBar>
				{profile && (
					<WelcomeMsg>
						{profile.user_reg_dv === "G" ? MESSAGE.PRE_WRITER : MESSAGE.WRITER}&nbsp;
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
						/>
					) : (
						// 일반 유저 로그인 상태
						<>
							<Buttons
								navigate={() => navigate("/favorite_novel")}
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.FAVORITE_NOVEL}
								margin={10}
								fontWeight={currentPath === "/favorite_novel" && "bolder"}
                minWidth={78}

							/>
							{/* 권한에 따라 내 정보, 내 작품 메뉴 변경 */}
							{profile.user_reg_dv === "W" && (
								<Buttons
									navigate={() => navigate("/author_myNovel")}
									type={CODE.BUTTON.BASIC}
									name={LABEL.BUTTONS.MY_NOVEL}
									margin={10}
									fontWeight={currentPath === "/author_myNovel" && "bolder"}
                  minWidth={70}
								/>
							)}
							<Buttons
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.MY_INFO}
								margin={"10px 25px 10px 10px"}
								showModal={() => setModal(true)}
								changeState={() => setPopup("editProfile")}
                minWidth={70}

							/>
							<Buttons
								type={CODE.BUTTON.BORDER}
								name={LABEL.BUTTONS.LOGOUT}
								backgroundColor={"black"}
								color={"white"}
								width={93}
								logout={logout}
        
							/>
						</>
					)}
				</MenuBtnBox>
			</MenuBar>
			<ModalPopup
				open={modal}
				width={modalWidth(popup)}
				height={modalHeight(popup)}
				onClose={() => setModal(false)}
				popupState={popup}
			>
				{popupChange()}
			</ModalPopup>
		</Whole>
	);
};

export default Header;