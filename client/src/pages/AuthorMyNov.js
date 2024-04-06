// React Package Module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen, setClickNovel } from "redux/slice";

// MUI Package Module
import { styled, Box } from "@mui/material";

// Content Component
import { NovelCard } from "components/contents";

// Control Component
import { Buttons } from "components/controls";

// Popup Component
import { ModalPopup } from "components/popup";

// Constant
import { CODE, LABEL, COLOR } from "common";

// API
import { getData } from "common/communication";

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
	display: "grid",
	gridTemplateColumns: "repeat(5, 1fr)",
	gridGap: "0.1rem",
});

// 소설 구분 버튼 박스
const DivNovelBtn = styled(Box)({
	display: "flex",
	minHeight: 40,
});

/** 작가 권한일 경우 헤더의 내 작품 클릭 시 나오는 페이지 */
const AuthorMyNov = () => {
	// redux state 정의
	const profile = useSelector((state) => state.main.profile);

	const [completeNovData, setCompleteNovData] = useState([]); // 로그인한 작가의 완성 소설 데이터
	const [incompleteNovData, setIncompleteNovData] = useState([]); // 로그인한 작가의 미완성 소설 데이터

	const [isComplete, setIsComplete] = useState(true); // 소설 완성 여부
	const [selectedTab, setSelectedTab] = useState("complete"); // 선택된 메뉴

	// 렌더링 시 소설 데이터 조회
	useEffect(() => {
		getMyCompleteNovel();
		getMyIncompleteNovel();
	}, []);

	// 완성 소설의 메인 작가, 서브 작가 아이디 중 로그인 아이디와 일치하는 소설 가져오기
	const getMyCompleteNovel = () => {
		getData("novel/getNovels", { user_id: profile.login_id })
			.then((data) => {
				setCompleteNovData(
					data.filter(
						(novel) =>
							novel.main_author_id === profile.login_id ||
							novel.sub_author_id === profile.login_id
					)
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

	const dispatch = useDispatch();

	const goToDetail = (novel) => {
		navigate("/novel_detail");
		dispatch(setClickNovel(novel));
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
					></span>
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
					></span>
					<Buttons
						type={CODE.BUTTON.BASIC}
						backgroundColor={COLOR.WHITE}
						color={COLOR.BLACK}
						name={LABEL.BUTTONS.WRITE_NOVEL}
						padding={0}
						onClick={() =>
							dispatch(
								setModalOpen({
									open: true,
									content: "authorWriteNov",
									fullWidth: true,
									width: "90%",
									height: "90vh",
								})
							)
						}
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
									cover_image={list.cover_image}
									onClick={() => goToDetail(list)}
								/>
							);
						})}
				</NovelCardBox>
			</MainBox>
			<ModalPopup />
		</>
	);
};

export default AuthorMyNov;
