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
import WriteNovPopup from "components/popup/WriteNovPopup";
import AuthorDetailPopup from "components/popup/AuthorDetailPopup";
import SelectTagPopup from "components/popup/SelectTagPopup";
import WriteNovIntroPopup from "components/popup/WriteNovIntroPopup";

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
	const novel = location.state.props;

	/** STATE 정의
	 * modal: Modal 팝업 상태
	 * popup:  팝업 내용 변경
	 * authorId: 소설 정보 헤더에서 클릭한 작가 ID
	 * authorNickName: 소설 정보 헤더에서 클릭한 작가 Nickname
	 * subNovelData: 메인 소설에 연결된 서브 소설들 데이터(BasicTable에 넘김)
	 * mainNovel: 이어쓰기 팝업에서 띄워져야 할 메인 소설의 데이터(title, content, seqno가 담겨있음)
	 * regditNovData: 이어쓰기 팝업에서 입력한 서브소설 데이터(t_sub_novel_mgt 테이블에 들어갈 데이터)
	 */
	const [modal, setModal] = useState(false);
	const [popup, setPopup] = useState("");
	const [authorId, setAuthorId] = useState("");
	const [authorNickName, setAuthorNickName] = useState("");
	const [subNovelData, setSubNovelData] = useState([]);
	const [mainNovel, setMainNovel] = useState({});

	// 아래 subNovel로 지은 state 아래와 같이 변경(서브 소설 데이터를 보내는거니 subNovel도 맞지만 위에 mainNovel로 인해 혼란이 옮) =>
	const [regditNovData, setRegditNovData] = useState({
		main_novel_seqno: null,
		title: null,
		content: null,
		genre: null,
		keyword: null,
	});



	// 서브 소설 가져오기
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

	// WriteNovPopup 입력하여 받아온 title, content 세팅 함수
	const setTitleContent = (data) => {

		const { title, content } = data;
		setRegditNovData({
			title: title,
			content: content
		}) 
	};

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
				<WriteNovPopup
					mainNovel={mainNovel}
					// setSubNovel={(novel) => setSubNovel(novel)}
					changeState={() => setPopup("selectTag")}
					setTitleContent={(data) => setTitleContent(data)}

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
				/>
			);
		} else if (popup === "novIntro") {
			return <WriteNovIntroPopup closeModal={closeModal} />;
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
							/>
							<Buttons
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.POPULAR}
								height={10}
							/>
						</FilterBox>
					</NovBoardInfoBox>
					<BasicTable subNovelData={subNovelData} />
				</NovBoardBox>
			</NovDetailBox>

			{/* 모달 팝업 영역 */}
			<ModalPopup
				fullWidth
				open={modal}
				// width={
				// 	popup === "viewComNov" && popup === "viewIncomNov" && popup === "writeNov" ? "80%" : 500
				// }
				width={modalWidth(popup)}
				// width={500}
				// height={popup === "viewComNov" || popup === "viewIncomNov" || popup === "writeNov" ? 800 : 380}
				onClose={closeModal}
				height={modalHeight(popup)}
			>
				{popupChange()}
			</ModalPopup>
		</Wrapper>
	);
};

export default NovDetail;
