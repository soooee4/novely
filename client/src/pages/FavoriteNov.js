// React Package Module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Package Module
import { styled, Box } from "@mui/material";

// Content Component
import NovelCard from "components/contents/NovelCard";

// Control Component
import Buttons from "components/controls/Button";

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
	display: "flex",
	flexWrap: "wrap",
	boxSizing: "border-box",
});

// 소설 구분 버튼 박스
const DivNovelBtn = styled(Box)({
	display: "flex",
	minHeight: 40,
});

/** 찜한 작품 클릭 시 나오는 페이지 */
const FavoriteNov = () => {
	/** STATE 정의
	 * completeNovData: 로그인한 작가의 완성 소설 데이터
	 * inCompleteNovData: 로그인한 작가의 미완성 소설 데이터
	 * profile: 로컬스토리지에 저장된 프로필
	 */
	const [completeNovData, setCompleteNovData] = useState([]); 							// 로그인한 작가의 완성 소설 데이터
	const [incompleteNovData, setIncompleteNovData] = useState([]); 						// 로그인한 작가의 미완성 소설 데이터
	const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile"))); 	// 로컬스토리지에 저장된 사용자 프로필
	const [selectedTab, setSelectedTab] = useState("complete"); 							// 선택된 메뉴
	const [isComplete, setIsComplete] = useState(true); 									// 소설 완성 여부 (기본값 complete 소설 표시)

	// 페이지 렌더링 시 찜한 완성 소설 데이터 조회
	useEffect(() => {
		getPickNovels();
	}, []);

	// 찜한 완성 소설 데이터 조회
	const getPickNovels = () => {
		getData("novel/getPickNovels", { login_id: profile.login_id })
			.then((data) => {
				setCompleteNovData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 찜한 완성 소설 데이터 조회
	const getPickIncompleteNovels = () => {
		getData("novel/getPickIncompleteNovels", { login_id: profile.login_id })
			.then((data) => {
				setIncompleteNovData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 상세정보 페이지로 클릭한 novel 정보 보내기
	const navigate = useNavigate();

	const goToDetail = (novel) => {
		navigate("/novel_detail", { state: { props: novel } });
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
						getPickNovels={getPickNovels}
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
						getPickIncompleteNovels={getPickIncompleteNovels}
						padding={0}
					/>
				</DivNovelBtn>
				<NovelCardBox>
					{/* 찜한 미완성 소설 데이터 */}
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
									pick_yn={list.pick_yn}
									user_id={profile.login_id}
									main_seqno={list.main_seqno}
									getPickIncompleteNovels={getPickIncompleteNovels}
									onClick={() => goToDetail(list)}
								/>
							);
						})}
					{/* 찜한 완성 소설 데이터 */}
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
									pick_yn={list.pick_yn}
									user_id={profile.login_id}
									main_seqno={list.main_seqno}
									getPickNovels={getPickNovels}
									onClick={() => goToDetail(list)}
								/>
							);
						})}
				</NovelCardBox>
			</MainBox>
		</>
	);
};

export default FavoriteNov;
