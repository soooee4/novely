// // React Package Module
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // MUI Package Module
// import { styled, Box } from "@mui/material";

// // Content Component
// import NovelCard from "components/contents/NovelCard";

// // Control Component
// import Buttons from "components/controls/Button";

// // Popup Component
// import AuthorWriteNovPopup from "../components/popup/AuthorWirteNovPopup";
// import AuthorWriteIntroPopup from "../components/popup/AuthorWriteIntroPopup";
// import ModalPopup from "components/popup/ModalPopup";

// // Constant
// import { CODE, LABEL, COLOR } from "common";

// //util
// import { modalWidth, modalHeight } from "common/util";

// // API
// import { getData, postData } from "common/communication";

// /** STYLE 정의 */
// // 헤더 제외 영역
// const MainBox = styled(Box)({
//   width: "80%",
//   display: "flex",
//   flexDirection: "column",
//   margin: "0 auto",
// });

// // 소설 컴포넌트 카드 영역
// const NovelCardBox = styled(Box)({
//   flexGrow: 1,
//   width: "100%",
//   margin: "0 auto",
//   display: "flex",
//   flexWrap: "wrap",
//   boxSizing: "border-box",
// });

// // 소설 구분 버튼 박스
// const DivNovelBtn = styled(Box)({
//   display: "flex",
//   minHeight: 40,
// });

// /** 작가 권한일 경우 헤더의 내 작품 클릭 시 나오는 페이지 */
// const AuthorMyNov = () => {
// 	/** STATE 정의
// 	 * completeNovData: 로그인한 작가의 완성 소설 데이터
// 	 * inCompleteNovData: 로그인한 작가의 미완성 소설 데이터
// 	 * profile: 로컬스토리지에 저장된 프로필
// 	 */
// 	const [completeNovData, setCompleteNovData] = useState([]); 		// 로그인한 작가의 완성 소설 데이터
// 	const [incompleteNovData, setIncompleteNovData] = useState([]); 	// 로그인한 작가의 미완성 소설 데이터
// 	const [profile, setProfile] = useState(
// 		JSON.parse(localStorage.getItem("profile"))
// 	); 																	// 로컬스토리지에 저장된 사용자 프로필
// 	const [isComplete, setIsComplete] = useState(true); 				// 소설 완성 여부
// 	const [selectedTab, setSelectedTab] = useState("complete"); 		// 선택된 메뉴
// 	const [modal, setModal] = useState(false); 							// 모달 open 여부
// 	const [popup, setPopup] = useState(""); 							// popup 상태값

// 	// 메인 소설 서버로 post하기 위한 데이터 세팅
// 	const [regditMainNovData, setRegditMainNovData] = useState({
// 		title: null,
// 		content: null,
// 		description: null,
// 		created_user: profile.login_id,
// 	});

// 	// AuthorWriteNovPopup에서 받아온 title, content 세팅 함수
// 	const setTitleContent = (data) => {
// 		setRegditMainNovData((prevState) => ({
// 			...prevState,
// 			title: data.title,
// 			content: data.content,
// 		}));
// 	};

// 	// AuthorWriteIntroPopup에서 받아온 description 세팅 함수
// 	const setDescription = (data) => {
// 		setRegditMainNovData((prevState) => ({
// 			...prevState,
// 			description: data,
// 		}));
// 	};

// 	// 렌더링 시 소설 데이터 조회
// 	useEffect(() => {
// 		getMyCompleteNovel();
// 	}, []);

//   // 완성 소설 중 로그인 아이디가 작성한 소설 가져오기
// 	const getMyCompleteNovel = () => {
// 		getData("novel/getNovels", { user_id: profile.login_id })
// 		.then((data) => {
// 			setCompleteNovData(
// 				data.filter((novel) => novel.main_author_id === profile.login_id)
// 			);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// 	};

// 	// 미완성 소설 중 로그인 아이디가 작성한 소설 가져오기
// 	const getMyIncompleteNovel = () => {
// 		getData("novel/getAuthorNovel", {
// 			created_user: profile.login_id,
// 			login_id: profile.login_id,
// 		})
// 		.then(function (data) {
// 			setIncompleteNovData(data.novel_data);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// 	};

// 	// 상세정보 페이지로 클릭한 novel 정보 보내기
// 	const navigate = useNavigate();

// 	const goToDetail = (novel) => {
// 		navigate("/novel-detail", { state: { props: novel } });
// 	};

// 	// Modal OPEN/CLOSE
// 	const showModal = () => {
// 		setModal(true);
// 	};

// 	const closeModal = () => {
// 		setModal(false);
// 	};

// 	// 메인소설 등록 함수
// 	const postMainNovel = () => {
// 		postData("novel/postMainNovel", {
// 			title: regditMainNovData.title,
// 			content: regditMainNovData.content,
// 			description: regditMainNovData.description,
// 			created_user: profile.login_id,
// 		})
// 			.then((data) => {
// 				alert("등록 완료!");
// 				closeModal();
// 				getMyIncompleteNovel();
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	};

// 	// 팝업 상태값 변경
// 	const popupChange = () => {
// 		if (popup === "authorWriteNov") {
// 			return (
// 				<AuthorWriteNovPopup
// 					setTitleContent={(data) => setTitleContent(data)}
// 					changeState={() => setPopup("authorWriteIntro")}
// 				/>
// 			);
// 		} else if (popup === "authorWriteIntro") {
// 			return (
// 				<AuthorWriteIntroPopup
// 					setDescription={(data) => setDescription(data)}
// 					regditMainNovData={regditMainNovData}
// 					profile={profile}
// 					postMainNovel={() => postMainNovel()}
// 				/>
// 			);
// 		}
// 	};

// 	return (
// 		<>
// 			<MainBox>
// 				<DivNovelBtn>
// 					<Buttons
// 						type={CODE.BUTTON.BASIC}
// 						backgroundColor={COLOR.WHITE}
// 						color={COLOR.BLACK}
// 						fontWeight={selectedTab === "complete" && "bolder"}
// 						name={LABEL.BUTTONS.COMPLETE}
// 						isComplete={() => setIsComplete(true)}
// 						setSelectedTab={() => setSelectedTab("complete")}
//             			getMyCompleteNovel={getMyCompleteNovel}
// 						padding={0}
// 					/>
// 					<span
// 						style={{
// 							paddingTop: 8,
// 							marginLeft: 8,
// 							marginRight: 8,
// 							display: "inline-block",
// 						}}
// 					>
// 						|
// 					</span>
// 					<Buttons
// 						type={CODE.BUTTON.BASIC}
// 						backgroundColor={COLOR.WHITE}
// 						color={COLOR.BLACK}
// 						fontWeight={selectedTab === "incomplete" && "bolder"}
// 						name={LABEL.BUTTONS.IN_COMPLETE}
// 						isComplete={() => setIsComplete(false)}
// 						setSelectedTab={() => setSelectedTab("incomplete")}
//             			getMyIncompleteNovel={getMyIncompleteNovel}
// 						padding={0}
// 					/>
// 					<span
// 						style={{
// 							paddingTop: 8,
// 							marginLeft: 8,
// 							marginRight: 8,
// 							display: "inline-block",
// 						}}
// 					>
// 						|
// 					</span>
// 					<Buttons
// 						type={CODE.BUTTON.BASIC}
// 						backgroundColor={COLOR.WHITE}
// 						color={COLOR.BLACK}
// 						name={LABEL.BUTTONS.WRITE_NOVEL}
// 						padding={0}
// 						popupChange={popupChange}
// 						showModal={showModal}
// 						changeState={() => setPopup("authorWriteNov")}
// 					/>
// 				</DivNovelBtn>

// 				<NovelCardBox>
// 					{incompleteNovData &&
// 						isComplete === false &&
// 						incompleteNovData.map((list) => {
// 							return (
// 								<NovelCard
// 									key={list.main_seqno}
// 									title={list.title}
// 									description={list.description}
// 									created_date={list.created_date}
// 									created_user={list.created_user}
//                   					cover_image={list.cover_image}
// 									onClick={() => goToDetail(list)}
// 								/>
// 							);
// 						})}
// 					{completeNovData && isComplete &&
// 						completeNovData.map((list) => {
// 							return (
// 								<NovelCard
// 									key={list.complete_seqno}
// 									title={list.complete_novel_title}
// 									genre_1={list.genre_1}
// 									genre_2={list.genre_2}
// 									keyword_1={list.keyword_1}
// 									keyword_2={list.keyword_2}
// 									keyword_3={list.keyword_3}
// 									genre_1_color={list.genre_1_color}
// 									genre_2_color={list.genre_2_color}
// 									keyword_1_color={list.keyword_1_color}
// 									keyword_2_color={list.keyword_2_color}
// 									keyword_3_color={list.keyword_3_color}
// 									description={list.description}
// 									like_count={list.like_count}
// 									created_date={list.created_date}
//                   cover_image={list.cover_image}
// 									onClick={() => goToDetail(list)}
// 								/>
// 							);
// 						})}
// 				</NovelCardBox>
// 			</MainBox>
// 			<ModalPopup
// 				fullWidth
// 				open={modal}
// 				width={modalWidth(popup)}
// 				onClose={closeModal}
// 				height={modalHeight(popup)}
// 			>
// 				{popupChange()}
// 			</ModalPopup>
// 		</>
// 	);
// };

// export default AuthorMyNov;
// React Package Module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Package Module
import { styled, Box } from "@mui/material";

// Content Component
import NovelCard from "components/contents/NovelCard";

// Control Component
import Buttons from "components/controls/Button";

// Popup Component
import AuthorWriteNovPopup from "../components/popup/AuthorWirteNovPopup";
import AuthorWriteIntroPopup from "../components/popup/AuthorWriteIntroPopup";
import ModalPopup from "components/popup/ModalPopup";

// Constant
import { CODE, LABEL, COLOR } from "common";

//util
import { modalWidth, modalHeight, modalColorMode } from "common/util";

// API
import { getData, postData } from "common/communication";

/** STYLE 정의 */
// 헤더 제외 영역
const MainBox = styled(Box)({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
});

// 소설 컴포넌트 카드 영역
const NovelCardBox = styled(Box)({
  flexGrow: 1,
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexWrap: "wrap",
  boxSizing: "border-box",
});

// 소설 구분 버튼 박스
const DivNovelBtn = styled(Box)({
  display: "flex",
  minHeight: 40,
});

/** 작가 권한일 경우 헤더의 내 작품 클릭 시 나오는 페이지 */
const AuthorMyNov = () => {
	/** STATE 정의
	 * completeNovData: 로그인한 작가의 완성 소설 데이터
	 * inCompleteNovData: 로그인한 작가의 미완성 소설 데이터
	 * profile: 로컬스토리지에 저장된 프로필
	 */
	const [completeNovData, setCompleteNovData] = useState([]); 		// 로그인한 작가의 완성 소설 데이터
	const [incompleteNovData, setIncompleteNovData] = useState([]); // 로그인한 작가의 미완성 소설 데이터
	const [profile, setProfile] = useState(
		JSON.parse(localStorage.getItem("profile"))
	); 																	                            // 로컬스토리지에 저장된 사용자 프로필
	const [isComplete, setIsComplete] = useState(true); 				    // 소설 완성 여부
	const [selectedTab, setSelectedTab] = useState("complete"); 		// 선택된 메뉴
	const [modal, setModal] = useState(false); 							        // 모달 open 여부
	const [popup, setPopup] = useState(""); 							          // popup 상태값
  	const [color, setColor] = useState("#ffffff");                  // 배경색 모드

	// 메인 소설 서버로 post하기 위한 데이터 세팅
	const [regditMainNovData, setRegditMainNovData] = useState({
		title: null,
		content: null,
		description: null,
		created_user: profile.login_id,
	});

	// AuthorWriteNovPopup에서 받아온 title, content 세팅 함수
	const setTitleContent = (data) => {
		setRegditMainNovData((prevState) => ({
			...prevState,
			title: data.title,
			content: data.content,
		}));
	};

	// AuthorWriteIntroPopup에서 받아온 description 세팅 함수
	const setDescription = (data) => {
		setRegditMainNovData((prevState) => ({
			...prevState,
			description: data,
		}));
	};

	// 렌더링 시 소설 데이터 조회
	useEffect(() => {
		getMyCompleteNovel();
	}, []);

  // 완성 소설 중 로그인 아이디가 작성한 소설 가져오기
  const getMyCompleteNovel = () => {
    getData("novel/getNovels", { user_id: profile.login_id })
			.then((data) => {
				setCompleteNovData(
					data.filter((novel) => novel.main_author_id === profile.login_id)
				);
			})
			.catch((err) => {
				console.log(err);
			});
  };

	// 미완성 소설 중 로그인 아이디가 작성한 소설 가져오기
	const getMyIncompleteNovel = () => {
		getData("novel/getAuthorNovel", {
			created_user: profile.login_id,
			login_id: profile.login_id,
		})
			.then(function (data) {
				setIncompleteNovData(data.novel_data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 상세정보 페이지로 클릭한 novel 정보 보내기
	const navigate = useNavigate();

	const goToDetail = (novel) => {
		navigate("/novel-detail", { state: { props: novel } });
	};

	// Modal OPEN/CLOSE
	const showModal = () => {
		setModal(true);
	};

	const closeModal = () => {
		setModal(false);
	};

	// 메인소설 등록 함수
	const postMainNovel = () => {
		postData("novel/postMainNovel", {
			title: regditMainNovData.title,
			content: regditMainNovData.content,
			description: regditMainNovData.description,
			created_user: profile.login_id,
		})
			.then((data) => {
				alert("등록 완료!");
				closeModal();
				getMyIncompleteNovel();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 팝업 상태값 변경
	const popupChange = () => {
		if (popup === "authorWriteNov") {
			return (
				<AuthorWriteNovPopup
					setTitleContent={(data) => setTitleContent(data)}
					changeState={() => setPopup("authorWriteIntro")}
          			color={color}
				/>
			);
		} else if (popup === "authorWriteIntro") {
			return (
				<AuthorWriteIntroPopup
					setDescription={(data) => setDescription(data)}
					regditMainNovData={regditMainNovData}
					profile={profile}
					postMainNovel={() => postMainNovel()}
          			color={color}
				/>
			);
		}
	};

	return (
		<>
			<MainBox>
				<DivNovelBtn>
					<Buttons
						type={CODE.BUTTON.BASIC}
						backgroundColor={COLOR.WHITE}
						color={COLOR.BLACK}
						fontWeight={selectedTab === "complete" && "bolder"}
						name={LABEL.BUTTONS.COMPLETE}
						isComplete={() => setIsComplete(true)}
						setSelectedTab={() => setSelectedTab("complete")}
            			getMyCompleteNovel={getMyCompleteNovel}
						padding={0}
					/>
					<span
						style={{
							paddingTop: 8,
							marginLeft: 8,
							marginRight: 8,
							display: "inline-block",
						}}
					>
						|
					</span>
					<Buttons
						type={CODE.BUTTON.BASIC}
						backgroundColor={COLOR.WHITE}
						color={COLOR.BLACK}
						fontWeight={selectedTab === "incomplete" && "bolder"}
						name={LABEL.BUTTONS.IN_COMPLETE}
						isComplete={() => setIsComplete(false)}
						setSelectedTab={() => setSelectedTab("incomplete")}
            			getMyIncompleteNovel={getMyIncompleteNovel}
						padding={0}
					/>
					<span
						style={{
							paddingTop: 8,
							marginLeft: 8,
							marginRight: 8,
							display: "inline-block",
						}}
					>
						|
					</span>
					<Buttons
						type={CODE.BUTTON.BASIC}
						backgroundColor={COLOR.WHITE}
						color={COLOR.BLACK}
						name={LABEL.BUTTONS.WRITE_NOVEL}
						padding={0}
						popupChange={popupChange}
						showModal={showModal}
						changeState={() => setPopup("authorWriteNov")}
					/>
				</DivNovelBtn>

				<NovelCardBox>
					{incompleteNovData &&
						isComplete === false &&
						incompleteNovData.map((list) => {
							return (
								<NovelCard
									key={list.main_seqno}
									title={list.title}
									description={list.description}
									created_date={list.created_date}
									created_user={list.created_user}
                  					cover_image={list.cover_image}
									onClick={() => goToDetail(list)}
								/>
							);
						})}
					{completeNovData && isComplete &&
						completeNovData.map((list) => {
							return (
								<NovelCard
									key={list.complete_seqno}
									title={list.complete_novel_title}
									genre_1={list.genre_1}
									genre_2={list.genre_2}
									keyword_1={list.keyword_1}
									keyword_2={list.keyword_2}
									keyword_3={list.keyword_3}
									genre_1_color={list.genre_1_color}
									genre_2_color={list.genre_2_color}
									keyword_1_color={list.keyword_1_color}
									keyword_2_color={list.keyword_2_color}
									keyword_3_color={list.keyword_3_color}
									description={list.description}
									like_count={list.like_count}
									created_date={list.created_date}
                  					cover_image={list.cover_image}
									onClick={() => goToDetail(list)}
								/>
							);
						})}
				</NovelCardBox>
			</MainBox>
			<ModalPopup
				fullWidth
				open={modal}
				width={modalWidth(popup)}
				onClose={closeModal}
				height={modalHeight(popup)}
				mode={modalColorMode(popup)}
				setColor={(data) => setColor(data)}
			>
				{popupChange()}
			</ModalPopup>
		</>
	);
};

export default AuthorMyNov;