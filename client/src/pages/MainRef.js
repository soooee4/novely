// React Package Module
import { useState } from "react";

// Content Component
import NovelCard from "components/contents/NovelCard";
import NovelInfo from "components/contents/NovelInfo";
import AuthorInfo from "components/contents/AuthorInfo";
import FollowList from "components/contents/FollowList";

// Layout Component
import Header from "components/layout/Header";
import BasicTable from "components/layout/BasicTable";

// Control Component
import Buttons from "components/controls/Button";
import Icons from "components/controls/Icons";
import Inputs from "components/controls/Input";
import SearchBar from "components/controls/Search";
import DropBox from "components/controls/DropBox";

// Popup Component
import LoginPopup from "components/popup/LoginPopup";
import JoinPopup from "components/popup/JoinPopup";
import ProfileAddPopup from "components/popup/ProfileAddPopup";
import ToastPopup from "components/popup/ToastPopup";
import ModalPopup from "components/popup/ModalPopup";

// Constant
import { CODE, LABEL, COLOR } from "common";
import { Alert, Stack } from "@mui/material";

/** 메인화면 Component */
const Main = () => {
	// Modal open/close, Popup State정의
	const [modal, setModal] = useState(false);
	const [popup, setPopup] = useState("login");
	const [loginAlert, setLoginAlert] = useState(false);

	const [isLogin, setIsLogin] = useState(
		localStorage.getItem("id") ? true : false
	);
	const [isToastOpen, setIsToastOpen] = useState(false);
	// const [login, setLogin] = useState(true);
	// const [join, setJoin] = useState(false);
	// const [profile, setProfile] = useState(false);

	const showModal = () => {
		setModal(true);
	};

	const closeModal = () => {
		setModal(false);
	};

	const logout = () => {
		localStorage.removeItem("id");
		setIsLogin(false);
		setModal(false);

		const popupChange = () => {
			if (popup === "login") {
				return (
					<LoginPopup
						changeState={() => setPopup("join")}
						closeModal={closeModal}
						logout={logout}
						isLogin={() => setIsLogin(true)}
					/>
				);
			} else if (popup === "join") {
				return <JoinPopup changeState={() => setPopup("profile")} />;
			} else if (popup === "profile") {
				return <ProfileAddPopup />;
			}
		};

		return (
			<>
				<BasicTable />
				<Header
					showModal={showModal}
					changeState={() => setPopup("login")}
					logout={logout}
					isLogin={isLogin}
					// 함수를 만들지 않고 넘길 때 형태
					// openLogin={() => setLogin(true)}
					// openProfile={() => setProfile(true)}
				/>
				<ModalPopup
					open={modal}
					width={600}
					height={400}
					onClose={() => setModal(false)}
				>
					{/* login 상태가 true일 때만 로그인 팝업 띄워지도록 조건처리 */}
					{/* {login === false ? 
                <JoinPopup /> 
                : 
                <LoginPopup closeLogin={closeLogin} /> }
              {profile && <ProfileAddPopup /> } */}
					{popupChange()}
				</ModalPopup>
				{/* <Buttons
                type={CODE.BUTTON.TAG}
                name={LABEL.BUTTONS.FANTASY}
                backgroundColor={'pink'}
            />
            <Buttons 
                type={CODE.BUTTON.TAG}
                name={LABEL.BUTTONS.FUNNY}
                backgroundColor={'skyBlue'}
            />
            <Buttons 
                type={CODE.BUTTON.TAG}
                name={LABEL.BUTTONS.HORROR}
                backgroundColor={'Orange'}
            />
            <Buttons
                type={CODE.BUTTON.BORDER}
                name={LABEL.BUTTONS.FOLLOW}
                backgroundColor={'white'}
                color={'black'}
            />
            <Buttons
                type={CODE.BUTTON.BORDER}
                name={LABEL.BUTTONS.UNFOLLOW}
                backgroundColor={'black'}
                color={'white'}
            />
            <Icons
              type={CODE.ICON.FILLHEART}
              color={COLOR.HEART_PINK}
            />       
            <Icons
              type={CODE.ICON.HEART}
              color={COLOR.HEART_PINK}
            />    
            <Icons
              type={CODE.ICON.CLOSE}
              color={COLOR.BLACK}
            />
            <Icons
              type={CODE.ICON.CAT}
              color={COLOR.BLACK}
            /> 
            <Icons
              type={CODE.ICON.SEARCH}
              color={COLOR.BLACK}
            /> 
            <NovelInfo></NovelInfo>
            <NovelCard></NovelCard> 
            <Inputs  
              label={'ID'} 
              id={'standard-basic'}
              helperText={LABEL.INPUT.VALIDATION}
            />
            <Inputs 
              label={'PW'}
              id="standard-read-only-input"
              defaultValue={'현재 값'}
              InputProps={{
                readOnly: true,
              }}
              helperText={LABEL.INPUT.VALIDATION}
            />
            <DropBox />
            <AuthorInfo />
            <FollowList />
            <FollowList />
            <FollowList />
            <FollowList />
            <SearchBar /> */}
				{/* <ToastPopup 
              type={LABEL.ALERT.SUCCESS}
              message={'이것은 에러입니다@@@@@@@@@'}
              open={isToastOpen}
              close={() => setIsToastOpen(false)}
            />
            <button onClick={() => setIsToastOpen(true)}>얼럿메시지오픈버튼</button> */}
			</>
		);
	};
};
export default Main;
