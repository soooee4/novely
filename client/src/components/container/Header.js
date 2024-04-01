// React Package Module
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen, setLogout } from "redux/slice";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

// Popup Component
import {
	ModalPopup
} from "components/popup";

// Constant
import { CODE, LABEL, MESSAGE } from "common";

// Util
import { modalWidth, modalHeight } from "common/util";

/** STYLE 정의 */
// 전체 영역
const Whole = styled(Box)({
	justifyContent: "space-between",
	width: "80%",
	height: 70,
	margin: "0 auto",
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

	const navigate = useNavigate();

	const goToPage = (url) => {
		navigate(url);
	};

	const logout = () => {
    dispatch(setLogout());
		goToPage("/");
	};

  const profile = useSelector((state) => state.main.profile);
	const content = useSelector((state) => state.main.modal.content);

	const dispatch = useDispatch();


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
				{profile.login_id && (
					<WelcomeMsg>
						{profile.user_reg_dv === "G" ? MESSAGE.PRE_WRITER : MESSAGE.WRITER}
						&nbsp;
						{profile.user_nickname}님 👋
					</WelcomeMsg>
				)}
				<MenuBtnBox>
					{/* 비로그인 상태 */}
					{!profile.login_id ? (
						<Buttons
							type={CODE.BUTTON.BORDER}
							name={LABEL.BUTTONS.LOGIN}
							backgroundColor={"black"}
							color={"white"}
							width={83}
							// showModal={() => setModal(true)}
							// changeState={() => setPopup("login")}
							setModalOpen={() => dispatch(setModalOpen("login"))}
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
                setModalOpen={() => dispatch(setModalOpen('editProfile'))}
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
				width={modalWidth(content)}
				height={modalHeight(content)}
			/>
		</Whole>
	);
};

export default Header;
