// React Package Module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Package Module
import { Button, styled, Box, Typography } from "@mui/material";

// Content Component
import NovelCard from "components/contents/NovelCard";
// Control Component
import Buttons from "components/controls/Button";
import Icons from "components/controls/Icons";
import Inputs from "components/controls/Input";
import SearchBar from "components/controls/Search";
import DropBox from "components/controls/DropBox";

// Constant
import { CODE, LABEL, COLOR } from "common";
import { Alert, Stack } from "@mui/material";
import axios from "axios";

import { getData, postData } from "common/communication";
import AuthorWriteNovPopup from "../components/popup/AuthorWirteNovPopup";
import AuthorWriteIntroPopup from "../components/popup/AuthorWriteIntroPopup";
import ModalPopup from "components/popup/ModalPopup";
import { modalWidth, modalHeight } from "common/util";

// 헤더 제외 영역
const MainBox = styled(Box)({
	width: "80%",
	display: "flex",
	flexDirection: "column",
	// border: "5px solid coral",
	margin: "0 auto",
});

// const ScrollContainer = styled(Box)({
// 	height: "100%",
// 	overflowY: "scroll",
//   border: "3px solid red"
// });

// 소설 컴포넌트 카드 영역
const NovelCardBox = styled(Box)({
	flexGrow: 1,
	// border: "3px solid green",
	width: "100%",
	margin: "0 auto",
	display: "flex",
	flexWrap: "wrap",
	boxSizing: "border-box",
});

// 소설 구분 버튼 박스
const DivNovelBtn = styled(Box)({
	// border: "3px solid orange",
	display: "flex",
	minHeight: 40,
	// margin: "0px 0px 0px auto",
});

/** 내 작품 화면 Component */
const AuthorMyNov = () => {
	/** STATE 정의
	 * completeNovData: 로그인한 작가의 완성 소설 데이터
	 * inCompleteNovData: 로그인한 작가의 미완성 소설 데이터
	 * profile: 로컬스토리지에 저장된 프로필
	 */
	const [completeNovData, setCompleteNovData] = useState([]);
	const [inCompleteNovData, setInCompleteNovData] = useState([]);
	const [profile, setProfile] = useState(
		JSON.parse(localStorage.getItem("profile"))
	);
	const [isComplete, setIsComplete] = useState(true);

	const [modal, setModal] = useState(false);
	const [popup, setPopup] = useState("");

	// 작가 소설 쓰기 모달창에서 받아 서버로 post 요청을 보낼 소설 데이터
	const [mainNovelData, setMainNovelData] = useState({});

	const [regditMainNovData, setRegditMainNovData] = useState({
		title: null,
		content: null,
		description: null,
		created_user: profile.login_id,
	});

	const [isPost, setIsPost] = useState(false);

	// *AuthorWriteNovPopup에서 받아온 title, content 세팅 함수
	const setTitleContent = (data) => {
		setRegditMainNovData((prevState) => ({
			...prevState,
			title: data.title,
			content: data.content,
		}));
	};

	// *AuthorWriteIntroPopup에서 받아온 description 세팅 함수
	const setDescription = (data) => {
		setRegditMainNovData((prevState) => ({
			...prevState,
			description: data.description,
		}));
	};

	// 완성 소설 중 로그인한 계정이 main author인 작품만 가져오기
	useEffect(() => {
		getData("novel/getNovel")
			.then((data) => {
				setCompleteNovData(
					data.filter((novel) => novel.main_author_id === profile.login_id)
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// 미완성 소설 중 로그인한 계정이 created user인 작품만 가져오기
	useEffect(() => {
		getData("novel/getAuthorNovel", { created_user: profile.login_id })
			.then(function (data) {
				setInCompleteNovData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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

	// 내 소설 쓰기 버튼 클릭 시 기능 함수
	const popupChange = () => {
		// setPopup("authorWriteNov");
		// setModal(true);
		if (popup === "authorWriteNov") {
			return (
				<AuthorWriteNovPopup
					setTitleContent={setTitleContent}
					changeState={() => setPopup("authorWriteIntro")}
				/>
			);
		} else if (popup === "authorWriteIntro") {
			return (
				<AuthorWriteIntroPopup
					setDescription={setDescription}
					regditMainNovData={regditMainNovData}
					profile={profile}
					setIsPost={setIsPost}
				/>
			);
		}
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
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<MainBox>
				<DivNovelBtn>
					<Buttons
						type={CODE.BUTTON.BASIC}
						backgroundColor={COLOR.WHITE}
						color={COLOR.BLACK}
						name={LABEL.BUTTONS.COMPLETE}
						isComplete={() => setIsComplete(true)}
						padding={0}
						// margin={"0px 0px 0px auto"}
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
						name={LABEL.BUTTONS.IN_COMPLETE}
						isComplete={() => setIsComplete(false)}
						padding={0}
						// padding={"0px 5px 0px 0px"}
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
					{/* <ScrollContainer> */}

					{inCompleteNovData &&
						isComplete === false &&
						inCompleteNovData.map((list) => {
							return (
								<NovelCard
									key={list.main_seqno}
									title={list.title}
									description={list.description}
									created_date={list.created_date}
									created_user={list.created_user}
									onClick={() => goToDetail(list)}
								/>
							);
						})}
					{completeNovData &&
						isComplete &&
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
									onClick={() => goToDetail(list)}
								/>
							);
						})}
				</NovelCardBox>
				{/* </ScrollContainer> */}
			</MainBox>
			<ModalPopup
				fullWidth
				open={modal}
				width={modalWidth(popup)}
				onClose={closeModal}
				height={modalHeight(popup)}
			>
				{popupChange()}
			</ModalPopup>
		</>
	);
};

export default AuthorMyNov;
