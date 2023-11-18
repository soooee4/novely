// React Package Module
import { useEffect, useState } from "react";
// 페이지간 Props 공유 위한 라이브러리
import { useLocation } from "react-router-dom";

// MUI Package Module
import { Box, Typography, styled } from "@mui/material";

// Control Component
import Icons from "components/controls/Icons";
import Buttons from "components/controls/Button";

// Layout Component
import BasicTable from "components/layout/BasicTable";

// Content Component
import NovelInfo from "components/contents/NovelInfo";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";

// Popup Component
import ModalPopup from "components/popup/ModalPopup";
import ViewCompleteNovPopup from "components/popup/ViewCompleteNovPopup";
import ViewIncompleteNovPopup from "components/popup/ViewIncompleteNovPopup";
import WriteSubNovPopup from "components/popup/WriteSubNovPopup";
import AuthorDetailPopup from "components/popup/AuthorDetailPopup";
import SelectTagPopup from "components/popup/SelectTagPopup";
import WriteNovIntroPopup from "components/popup/WriteNovIntroPopup";
import SetNovCoverPopup from "components/popup/SetNovCoverPopup";
import ViewSubNovPopup from "components/popup/ViewSubNovPopup";

import { getData } from "common/communication";
import { modalWidth, modalHeight } from "common/util";

/** 영역 STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "99vw",
	height: "99vh",
	// border: '2px solid green',
	display: "flex",
	flexDirection: "column",
	padding: "0px 100px",
	// margin, padding 값이 전체 요소에 포함되도록 설정
	boxSizing: "border-box",
});

// 소설 커버 이미지, 소설 목록 게시판 영역
const NovDetailBox = styled(Box)({
	// border: '2px solid blue',
	height: "100%",
	display: "flex",
	// paddingTop: 50,
	flexWrap: "wrap",
});

// 소설 커버 이미지, 좋아요 박스 영역
const NovCoverBox = styled(Box)({
	width: 300,
	height: "70%",
	// border: '2px solid pink',
	display: "flex",
	flexDirection: "column",
	flexShrink: 0,
	marginRight: 20,
});

// 소설 커버 이미지 영역
const NovelCover = styled(Box)({
	width: "100%",
	height: "100%",
	marginTop: 5,
	borderRadius: 15,
	// marginBottom: 10,
	backgroundColor: "pink",
});

// 좋아요 박스 영역
const LikeBox = styled(Box)({
	// backgroundColor: 'yellow',
	flexGrow: 1,
	display: "flex",
	marginLeft: "auto",
});

// 좋아요 카운트 영역
const LikeCount = styled(Typography)({
	fontSize: 13,
	marginRight: 10,
	display: "flex",
	alignItems: "center",
});

// 소설 게시판 영역
const NovBoardBox = styled(Box)({
	// border: '2px solid yellow',
	height: "70%",
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	padding: "10px",
});

// 소설 게시판 갯수 및 필터 버튼 영역
const NovBoardInfoBox = styled(Box)({
	// border: '2px solid red',
	height: 20,
	display: "flex",
	marginBottom: 10,
});

// 소설 게시판 갯수
const NovelCount = styled(Typography)({
	// fontsize: 5,
	height: "5%",
	marginRight: "auto",
	marginLeft: 10,
});

// 소설 게시판 필터 버튼 영역
const FilterBox = styled(Box)({
	// border: '1px solid green',
	marginRight: 10,
});

// 소설 상세보기 컴포넌트
const NovDetail = () => {
	// 메인 페이지에서 넘겨받은 클릭한 소설의 상세 정보
	// navigate 메서드로 넘긴 props를 받는 방법
	const location = useLocation();

	// ! 메인 소설 등록 post 요청 전 임시 처리
	const novel =
		// location.state && location.state.props ? location.state.props : {};
		location.state.props;

	//?
	// console.log(novel, "test");
	/** STATE 정의
	 * modal: Modal 팝업 상태
	 * popup:  팝업 내용 변경
	 * authorId: 소설 정보 헤더에서 클릭한 작가 ID
	 * authorNickName: 소설 정보 헤더에서 클릭한 작가 Nickname
	 * subNovelData: 메인 소설에 연결된 서브 소설들 데이터(BasicTable에 넘김)
	 * mainNovel: 이어쓰기 팝업에서 띄워져야 할 메인 소설의 데이터(title, content, seqno가 담겨있음)
	 * isPopular: 서브 소설을 담은 table에 인기순인지 최신순인지 알려주기 위한 상태
	 * regditNovData: 이어쓰기 팝업에서 입력한 서브소설 데이터(t_sub_novel_mgt 테이블에 들어갈 데이터)
	 */
	const [modal, setModal] = useState(false);
	const [popup, setPopup] = useState("");
	const [authorId, setAuthorId] = useState("");
	const [authorNickName, setAuthorNickName] = useState("");
	const [subNovelData, setSubNovelData] = useState([]);
	const [mainNovel, setMainNovel] = useState({});
	const [novelIdx, setNovelIdx] = useState(0);
	const [isPopular, setIsPopular] = useState(false);

	// 기존 subNovel로 지은 state 아래와 같이 변경(서브 소설 데이터를 보내는거니 subNovel도 맞지만 위에 mainNovel로 인해 혼란이 옮)
	const [regditNovData, setRegditNovData] = useState({
		main_novel_seqno: null,
		title: null,
		content: null,
		genre: null,
		keyword: null,
	});

	// * 인기순 정렬
	// 인기순 (like_count가 많은 순으로 정렬할 서브노벨 배열)
	const [popularOrder, setPopularOrder] = useState([]);

	// 위 popularOrder 배열 초깃값으로 subNovelData를 넣었더니 반영되지 않는 문제 발생하여 useEffect로 처리
	useEffect(() => {
		setPopularOrder([...subNovelData]);
	}, [subNovelData]);

	// NovDetail에서 인기순 버튼 클릭 시 실행할 함수
	const sortPopular = () => {
		console.log("is working");
		setIsPopular(true);
		popularOrder.sort((a, b) => b.sub_like_count - a.sub_like_count);
	};

	// * 소설에 딸린 서브 소설 가져오기
	useEffect(() => {
		getData("novel/getSubNovel", { main_novel_seqno: novel.main_seqno })
			.then(function (data) {
				setSubNovelData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [novel.main_seqno]);

	// Modal OPEN/CLOSE
	const showModal = () => {
		setModal(true);
	};

	const closeModal = () => {
		setModal(false);
	};

	// !regditNovData에 데이터를 추가하는 아래 함수를 호출할 때마다 새로 갱신되기 때문에 데이터가 쌓이지 않음. 해결하기 위해 prevState(함수형 업데이트)를 사용하여 현재 상태 복사 후 새로운 값 추가
	// *WriteSubNovPopup 입력하여 받아온 title, content 세팅 함수

	const setTitleContent = (data) => {
		// 구조 분해 할당 사용
		// const { title, content } = data;
		setRegditNovData((prevState) => ({
			...prevState,
			title: data.title,
			content: data.content,
			main_novel_seqno: data.main_novel_seqno,
		}));
	};

	// *SelectTagPopup에서 받아온 genre, keyword 세팅 함수
	const setTags = (data) => {
		setRegditNovData((prevState) => ({
			...prevState,
			genre: data.genre,
			keyword: data.keyword,
		}));
	};

	// *WriteNovIntroPopup 받아온 description 세팅 함수
	const setDescription = (data) => {
		setRegditNovData((prevState) => ({
			...prevState,
			description: data.description,
		}));
	};

	// console.log(regditNovData,"regditNovData")

	// 팝업 상태값 변경
	const popupChange = () => {
		if (popup === "viewComNov") {
			return <ViewCompleteNovPopup complete_seqno={novel.complete_seqno} />;
		} else if (popup === "viewIncomNov") {
			return (
				<ViewIncompleteNovPopup
					changeState={() => setPopup("writeNov")}
					main_seqno={novel.main_seqno}
					setMainNovel={(novel) => setMainNovel(novel)}
				/>
			);
		} else if (popup === "writeNov") {
			return (
				<WriteSubNovPopup
					mainNovel={mainNovel}
					// setSubNovel={(novel) => setSubNovel(novel)}
					changeState={() => setPopup("selectTag")}
					setTitleContent={(data) => setTitleContent(data)}
					// 현재 data의 형태는 WriteSubNovPopup에서 받은 { title: title, content: content }
				/>
			);
		} else if (popup === "authorDetail") {
			return (
				<AuthorDetailPopup
					authorId={authorId}
					authorNickName={authorNickName}
					closeModal={closeModal}
				/>
			);
		} else if (popup === "selectTag") {
			return (
				<SelectTagPopup
					closeModal={closeModal}
					changeState={() => setPopup("novIntro")}
					setTags={(data) => setTags(data)}
				/>
			);
		} else if (popup === "novIntro") {
			return (
				<WriteNovIntroPopup
					closeModal={closeModal}
					setDescription={setDescription}
					changeState={() => setPopup("novCover")}
				/>
			);
		} else if (popup === "novCover") {
			return <SetNovCoverPopup closeModal={closeModal} />;
		} else if (popup === "viewSubNov") {
			return (
				<ViewSubNovPopup
					closeModal={closeModal}
					// 컴포넌트로 넘겨줄 때 서브 소설 전체가 아닌 클릭한 소설의 고유 index 상태값을 넣어 인덱싱 하여 넘김
					subNovelData={subNovelData[novelIdx]}
					mainNovel={novel}
				/>
			);
		}
	};

	return (
		<Wrapper>
			{/* 소설 정보 헤더 영역 */}
			<NovelInfo
				// 소설 정보
				title={
					novel.complete_novel_title ? novel.complete_novel_title : novel.title
				}
				complete_seqno={novel.complete_seqno}
				description={novel.description}
				main_author_id={novel.main_author_id}
				sub_author_id={novel.sub_author_id}
				main_author_nickname={novel.main_author_nickname}
				sub_author_nickname={novel.sub_author_nickname}
				like_count={novel.like_count}
				created_date={novel.created_date}
				created_user={novel.created_user}
				user_nickname={novel.user_nickname}
				// 페이지 및 팝업 상태 변경
				showModal={showModal}
				setPopup={(state) => setPopup(state)}
				setAuthorId={(id) => setAuthorId(id)}
				setAuthorNickName={(nickName) => setAuthorNickName(nickName)}
			/>

			{/* 소설 이미지 및 서브 소설 정보 영역 */}
			<NovDetailBox>
				<NovCoverBox>
					<LikeBox>
						<LikeCount>{novel.like_count}</LikeCount>
						<Icons type={CODE.ICON.HEART} color={COLOR.HEART_PINK} />
					</LikeBox>
					<NovelCover />
				</NovCoverBox>
				<NovBoardBox>
					<NovBoardInfoBox>
						{subNovelData.length !== 0 ? (
							<NovelCount>
								{subNovelData.length}
								{MESSAGE.BOARD_COUNT}
							</NovelCount>
						) : (
							<NovelCount>첫 결말의 주인공이 되어보세요!</NovelCount>
						)}
						<FilterBox>
							<Buttons
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.LATEST}
								height={10}
								sortLatest={() => setIsPopular(false)}
							/>
							<Buttons
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.POPULAR}
								height={10}
								sortPopular={sortPopular}
							/>
						</FilterBox>
					</NovBoardInfoBox>
					<BasicTable
						subNovelData={subNovelData}
						changeState={() => setPopup("viewSubNov")}
						showModal={showModal}
						// table 안의 index를 고유 키 값으로 사용하기 위해 props로 전달
						setNovelIdx={setNovelIdx}
						popularOrder={popularOrder}
						isPopular={isPopular}
					/>
				</NovBoardBox>
			</NovDetailBox>

			{/* 모달 팝업 영역 */}
			<ModalPopup
				fullWidth
				open={modal}
				width={modalWidth(popup)}
				onClose={closeModal}
				height={modalHeight(popup)}
			>
				{popupChange()}
			</ModalPopup>
		</Wrapper>
	);
};

export default NovDetail;
