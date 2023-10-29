// React Package Module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Package Module
import { Button, styled, Box } from "@mui/material";

// Content Component
import NovelCard from "components/contents/NovelCard";

// Layout Component
import Header from "components/layout/Header";

// Control Component
import Buttons from "components/controls/Button";
import Icons from "components/controls/Icons";
import Inputs from "components/controls/Input";
import SearchBar from "components/controls/Search";
import DropBox from "components/controls/DropBox";

// Popup Component
import ToastPopup from "components/popup/ToastPopup";
import ModalPopup from "components/popup/ModalPopup";
import LoginPopup from "components/popup/LoginPopup";
import JoinPopup from "components/popup/JoinPopup";
// import ProfileAddPopup from "components/popup/ProfileAddPopup";

// Constant
import { CODE, LABEL, COLOR } from "common";
import { Alert, Stack } from "@mui/material";
import axios from "axios";

import { getData } from "common/communication";

import NovDetail from "./NovDetail";

// 헤더 제외 영역
const MainBox = styled(Box)({
	// border: "2px solid red",
  
	// height: "100vh",
	width: "99wh",
	display: "flex",
	flexDirection: "column",
  // marginTop: 10
});

// 검색창 하단 장르 태그 박스
const TagBox = styled(Box)({
	width: "80%",
	// border: "2px solid green",
	height: 25,
	margin: "0 auto",
  marginBottom: 8,
  marginTop: 5
});

// const ScrollContainer = styled(Box)({
// 	height: "100%",
// 	overflowY: "scroll",
//   border: "3px solid red"
// });

// 소설 컴포넌트 카드 영역
const NovelCardBox = styled(Box)({
	flexGrow: 1,
	// border: "2px solid pink",
	width: "80%",
	margin: "0 auto",
	display: "flex",
	flexWrap: "wrap",
	// gap: 30
	// overflowY: "scroll",
	// justifyContent: "space-between",
});

/** 메인화면 Component */
const Main = () => {
	// 소설 정보 데이터, Modal open/close, Popup State정의
	const [novelData, setNovelData] = useState([]);
	const [modal, setModal] = useState(false);
	const [popup, setPopup] = useState("login");
	const [isLogin, setIsLogin] = useState(
		localStorage.getItem("id") ? true : false
	);
  const [genre,setGenre] = useState([]);

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
			return <JoinPopup changeState={() => setPopup("profile")} />;
		// } else if (popup === "profile") {
		// 	return <ProfileAddPopup />;
		}
	};
  
	useEffect(() => {

    console.log(getData("novel/getNovel"))

		getData("novel/getNovel")
			.then((data) => {
				setNovelData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

  // 장르 태그 조회 함수
	useEffect(() => {
    getData("common/genre")
    .then((data) => {
      // console.log(data,111000)
      setGenre(data);
      // console.log(data,190238)
    })
    .catch((err) => {
      console.log(err);
    });
	}, []);
  
  // console.log(genre[1].color,123798)



	const navigate = useNavigate();

	const goToDetail = (novel) => {
		if (!localStorage.getItem("profile")) {
			// 비로그인 상태
			setModal(true);
		} else {
			// 로그인 상태
			navigate("/novel-detail", { state: { props: novel } });
		}
	};

	return (
		<MainBox>
			{/* <Header
				showModal={showModal}
				changeState={() => setPopup("login")}
				logout={logout}
				isLogin={isLogin}
				// 함수를 만들지 않고 넘길 때 형태
				// openLogin={() => setLogin(true)}
				// openProfile={() => setProfile(true)}
			/> */}
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
			<SearchBar />
			<TagBox>
       {/* 장르를 가져오는 API 생성하여 state 안에 배열로 넣어 반복문 통해 태그 버튼 형식으로 뿌리기 */}
       {genre.map((list, i) => {
        // const color = {list};
        // console.log(color,3478)

          return (
            <Buttons
              key={i}
              type={CODE.BUTTON.TAG}
              name={list.code_name}
              backgroundColor={`#${list.color}`}
            />
          )
       })}
      </TagBox>
			{/* <ScrollContainer> */}
				<NovelCardBox>
					{novelData.map((list, i) => {
						return (
							<NovelCard
                key={i}
								title={list.title}
								genre_1={list.genre_1}
								genre_2={list.genre_2}
								keyword_1={list.keyword_1}
								keyword_2={list.keyword_2}
								keyword_3={list.keyword_3}
								description={list.description}
								like_count={list.like_count}
								onClick={() => goToDetail(list)}
								// onClick={() =>
								// 	navigate("/novel-detail", { state: { props: list } })
								// }
							/>
						);
					})}
				</NovelCardBox>
			{/* </ScrollContainer> */}
			<ModalPopup
				open={modal}
				width={600}
				height={400}
				onClose={() => setModal(false)}
			>
				{popupChange()}
			</ModalPopup>
		</MainBox>
	);
};

export default Main;
