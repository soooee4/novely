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

	// 일단 그러면 로그인이 성공했을 때 이 아래 isLogin값을 true로 바꿔주는 작업을 해줘야겠죠? onLogin이 정의된 곳은 로그인 팝업이니 로그인 팝업에 이 state를 조정할 수 있도록 세팅해줍니다
	const [isLogin, setIsLogin] = useState(
		localStorage.getItem("id") ? true : false
	); //  조건 수정됐어요
	// 여기서 useState의 초깃값이 localStorage.getItem('id')인 이유는  main이 딱 켜졌을 때, 로컬스토리지 찾아서 id가 있으면 로그인 상태로 간주하고, 없으면 로그아웃 상태로 간주하기 위해서입니다
	// 만약 페이지를 처음켜서 로그인을 안한 상태라면 로커스토리지에 값이 없을거고, 그럼 당연히 저 useState값은 false겟죠? 여기까지 이해가셨나요 천천히 보세요
	// 자 그러면 로그인 상태인지 / 로그인 상태가 아닌지를 공유 받아야 할 컴포넌트는 Header.js 죠?
	// 그래서 헤더에 그 상태값을 공유해줍니다   밑에 리턴쪽 헤더에 값을 넘길테니 따라오세요
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

		// 로그아웃 시 필요한 기능
		// 1. 로컬스토리지 아이디 지우기 (메인 페이지로 다시 돌아왔을 때 로컬스토리지에 id가 남아있다면 로그아웃을 한 상태인데도 로그인 상태로 인지할 것이기 때문에)
		// 2. Main.js의 isLogin 상태값을 false로 변경해주기 (그래야 헤더에서 logout 함수를 실행하면 여기 state가 false로 바뀌고 그 상태값을 각 컴포넌트들이 공유받을 것이기 때문에)
	};

	// 네 그거 혼자 한번 해보시고   아 같이 하자구요? 네엡   이거 하나만 아시면 되는데
	// 그 여기 main에 state값을 하나 선언해놓고   그 값에 따라    조건을 줘서 toast 메시지가 뭐뭐 뜨면 된다 라고 주시고
	// 모달 선언하듯이 하시면 될거에요 아마 드래그 풀어주실 수 잇나용 잘 안보여요 화장실 좀 다녀오겠습니다

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

export default Main;
