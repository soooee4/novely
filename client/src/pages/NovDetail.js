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
import ViewNovPopup from "components/popup/ViewNovPopup";
import WriteNovPopup from "components/popup/WriteNovPopup";
import AuthorDetailPopup from "components/popup/AuthorDetailPopup";

import { getData } from "common/communication";

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
	// Modal 팝업 상태, 팝업 내용 변경 State
	const [modal, setModal] = useState(false);
	const [popup, setPopup] = useState("viewNov");

	// Modal OPEN/CLOSE
	const showModal = () => {
		setModal(true);
	};

	// 팝업 상태값 변경
	const popupChange = () => {
		if (popup === "viewNov") {
			return <ViewNovPopup changeState={() => setPopup("writeNov")} />;
		} else if (popup === "writeNov") {
			return <WriteNovPopup />;
		} else if (popup === "authorDetail") {
			return <AuthorDetailPopup  />;
		}
	};

	// 메인 페이지에서 넘겨받은 클릭한 소설의 상세 정보
  // navigate 메서드로 넘긴 props를 받는 방법
	const location = useLocation();
	const novel = location.state.props;

	// 서브 소설 가져오기

	const [subNovelData, setSubNovelData] = useState([]);
	const [mainNovelData, setMainNovelData] = useState([]);

	// 서브 소설 가져오기
	useEffect(() => {
		getData("novel/getSubNovel", { main_novel_seqno: novel.main_seqno })
			.then(function (data) {
				setSubNovelData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// 메인 소설 가져오기
	// useEffect(() => {
	// 	getData("novel/getMainNovel")
	// 		.then(function (data) {
	// 			// console.log(data, 158158);
	// 			setMainNovelData(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	// console.log(mainNovelData,179179)
//   useEffect(() => {
// 	const dDay = () => {
// 		const subSeqno = [];
// 		const mainSeqno = [];
// 		subNovelData.map((list) => {
// 			subSeqno.push(list.main_novel_seqno);
// 		});
// 		mainNovelData.map((list) => {
// 			mainSeqno.push(list.novel_seqno);
// 		});

//     if(subSeqno === mainSeqno) {
//       console.log('일치하는 소설')
//     }
// 	}
//   dDay();
// }, []);

	return (
		<Wrapper>
			{/* <Header
				showModal={showModal}
				changeState={() => setPopup("login")}
				logout={logout}
				isLogin={isLogin}
				// 함수를 만들지 않고 넘길 때 형태
				// openLogin={() => setLogin(true)}
				// openProfile={() => setProfile(true)}
			/> */}
			<NovelInfo
				title={novel.complete_novel_title}
				description={novel.description}
				like_count={novel.like_count}
				showModal={showModal}
        setPopup={() => setPopup("authorDetail")}
				main_author_id={novel.main_author_id}
				sub_author_id={novel.sub_author_id}
				sub_novel_data={mainNovelData}
				main_novel_data={mainNovelData}
        complete_seqno={novel.complete_seqno}
        // changeState={() => setPopup("AuthorDetail")}
        // changeState={changeState()}
				//!닉네임으로 변경 필요
			/>
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
						{/* <NovelCount>
              {subNovelData.length}{MESSAGE.BOARD_COUNT}
            </NovelCount> */}
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
			{/* <button 
        type="button"
        // onClick={showModal}
        onClick={() => {
          showModal();
          setPopup('viewNov');
        }}
      >
        다음
      </button> */}

			{/* 모달 팝업 영역 */}
			<ModalPopup
				open={modal}
				width={600}
				height={400}
				onClose={() => setModal(false)}
			>
				{popupChange()}
			</ModalPopup>
		</Wrapper>
	);
};

export default NovDetail;
