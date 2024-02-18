// React Package Module
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI Package Module
import { Box, Typography, styled } from "@mui/material";

// Content Component
import NovelInfo from "components/contents/NovelInfo";

// Layout Component
import BasicTable from "components/layout/BasicTable";

// Control Component
import Buttons from "components/controls/Button";

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

// Constant
import { CODE, LABEL, MESSAGE } from "common";

// util
import {
	modalWidth,
	modalHeight,
	modalColorMode,
	compressImage,
} from "common/util";

// API
import { getData, postData } from "common/communication";

/** 영역 STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	height: "99vh",
	display: "flex",
	flexDirection: "column",
	boxSizing: "border-box",
  paddingLeft: 150
});

// 소설 커버 이미지, 소설 목록 게시판 영역
const NovDetailBox = styled(Box)({
	height: "100%",
	display: "flex",
});

// 소설 커버 이미지 영역
const NovelCover = styled(Box)({
	minWidth: 200,
	height: 300,
	marginTop: 5,
	borderRadius: 15,
	backgroundColor: "pink",
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
  marginRight: 35
});

// 소설 게시판 영역
const NovBoardBox = styled(Box)({
	height: "70%",
	display: "flex",
	flexDirection: "column",
	padding: "10px",
});

// 소설 게시판 갯수 및 필터 버튼 영역
const NovBoardInfoBox = styled(Box)({
	height: 20,
	display: "flex",
	marginBottom: 10,
});

// 소설 게시판 갯수
const NovelCount = styled(Typography)({
	height: "5%",
	marginRight: "auto",
	marginLeft: 10,
});

// 소설 게시판 필터 버튼 영역
const FilterBox = styled(Box)({
	marginRight: 10,
});

/** 작품 상세 페이지 (NovelCard 컴포넌트 클릭 시 해당 페이지로 이동) */
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
	 * isPopular: 서브 소설을 담은 table에 인기순인지 최신순인지 알려주기 위한 상태
	 * regditNovData: 이어쓰기 팝업에서 입력한 서브소설 데이터(t_sub_novel_mgt 테이블에 들어갈 데이터)
	 */
	const [modal, setModal] = useState(false); // 모달 open 여부
	const [popup, setPopup] = useState(""); // popup 상태값
	const [authorId, setAuthorId] = useState(""); // 소설 정보 헤더에서 클릭한 작가 아이디
	const [authorNickName, setAuthorNickName] = useState(""); // 소설 정보 헤더에서 클릭한 작가 닉네임
	const [subNovelData, setSubNovelData] = useState([]); // 메인 소설에 연결된 서브 소설들 데이터(BasicTable에 넘김)
	const [mainNovel, setMainNovel] = useState({}); // 이어쓰기 팝업에서 띄워져야 할 메인 소설의 데이터(title, content, seqno가 담겨있음)
	const [novelIdx, setNovelIdx] = useState(0); // 클릭한 소설의 인덱스
	const [isPopular, setIsPopular] = useState(false); // 서브 소설을 담은 table에 인기순인지 최신순인지 알려주기 위한 상태
	const [profile, setProfile] = useState(
		JSON.parse(localStorage.getItem("profile"))
	); // 로컬스토리지에 저장된 사용자 정보
	const [isLike, setIsLike] = useState(false); // 노벨카드에서 소설 찜 상태 변경 여부 공유받기 위한 상태
	const [color, setColor] = useState("#ffffff"); // 배경색 모드

	// 서버에 post하기 위한 데이터
	const [regditNovData, setRegditNovData] = useState({
		main_novel_seqno: null,
		title: null,
		content: null,
		genre_1: null,
		genre_2: null,
		keyword_1: null,
		keyword_2: null,
		keyword_3: null,
		description: null,
		file: "cover_basic.jpg",
		created_user: profile.login_id,
	});


	// 인기순 (like_count가 많은 순으로 정렬할 서브 소설 배열)
	const [popularOrder, setPopularOrder] = useState([]);

	// 위 popularOrder 배열 초깃값으로 subNovelData를 넣었더니 반영되지 않는 문제 발생하여 useEffect로 처리
	useEffect(() => {
		setPopularOrder([...subNovelData]);
	}, [subNovelData]);

	// 인기순 Filtering
	const sortPopular = () => {
		setIsPopular(true);
		popularOrder.sort((a, b) => b.sub_like_count - a.sub_like_count);
	};

	// 소설에 딸린 서브 소설 가져오기
	const getSubNovelData = () => {
		getData("novel/getSubNovel", {
			main_novel_seqno: novel.main_seqno,
			user_id: profile.login_id,
		})
			.then(function (data) {
				setSubNovelData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 서브소설 데이터 조회
	useEffect(() => {
		getSubNovelData();
	}, [novel.main_seqno]);

	/** Modal OPEN/CLOSE */
	const showModal = () => {
		setModal(true);
	};
	const closeModal = () => {
		setModal(false);
	};

	/** 각 팝업에서 받아온 데이터를 NovDetail 페이지 state에 세팅 */
	// WriteSubNovPopup 입력하여 받아온 title, content 세팅 함수
	const setTitleContent = (data) => {
		setRegditNovData((prevState) => ({
			...prevState,
			title: data.title === "" ? novel.title : data.title, // 서브 소설 타이틀이 변경되지 않았을 경우 메인 소설 타이틀 데이터 세팅
			content: data.content,
			main_novel_seqno: data.main_novel_seqno,
		}));
	};

	// SelectTagPopup에서 받아온 genre, keyword 세팅 함수
	const setTags = (data) => {
		setRegditNovData((prevState) => ({
			...prevState,
			genre_1: data.genre[0].code,
			genre_2: data.genre[1] && data.genre[1].code,
			keyword_1: data.keyword[0].code,
			keyword_2: data.keyword[1] && data.keyword[1].code,
			keyword_3: data.keyword[2] && data.keyword[2].code,
		}));
	};

	// WriteNovIntroPopup 받아온 description 세팅 함수
	const setDescription = (data) => {
		setRegditNovData((prevState) => ({
			...prevState,
			description: data.description,
		}));
	};

	// SelectTagPopup 받아온 description 세팅 함수
	const setCoverImage = (data) => {
		setRegditNovData((prevState) => ({
			...prevState,
			file: data.file,
		}));
	};

	// 서브 소설 데이터 서버 전송
	const postSubNovData = async () => {
    let subNovData;

    // 커버 이미지 선택할 경우 폼 데이터 생성
    if (regditNovData.file !== "cover_basic.jpg") {
      // 선택된 이미지 파일의 확장자명이 jpeg, jpg, png가 아닐 경우 경고문 띄우고 함수 종료
      const ext = regditNovData.file.type.split("/")[1];
      const allowList = ["jpeg", "jpg", "png"];
      if (!allowList.includes(ext)) {
        alert(MESSAGE.ERROR.CHECK_EXT);
        return;
      }

      // 이미지 압축
      const resizingImg = await compressImage(regditNovData.file);
      setRegditNovData((prev) => ({
        ...prev,
        file: resizingImg,
      }));

      const formData = new FormData();

      Object.keys(regditNovData).forEach((key) => {
        formData.append(key, regditNovData[key]);
      });

      subNovData = formData;

      // 커버 이미지 선택없이 나머지 데이터만 전송할 경우
    } else {
      subNovData = regditNovData;
    }

    postData("novel/postSubNovel", subNovData)
      .then((msg) => {
        alert(msg);
        closeModal();
        getSubNovelData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

	// 소설 마감 기한 알려주는 디데이 카운터 함수
	const novelDdayCounter = () => {
		// 문자열로 뽑히는 created_date를 Date 객체로 변환
		const createdDate = new Date(novel.created_date);

		// 마감일은 소설의 작성일 기준 30일 후로 설정
		const dueDate = new Date(createdDate.setDate(createdDate.getDate() + 30));

		// 현재 시간(PC 설정 관계없이 서울 시간으로 고정)
		const krCurr = new Date(
			new Date().getTime() +
				new Date().getTimezoneOffset() * 60 * 1000 +
				9 * 60 * 60 * 1000
		);

		// 현재 날짜와 마감일의 차이를 밀리초 단위로 변환하여 계산
		let leftTime = dueDate.getTime() - krCurr.getTime();

		// 밀리초를 일 단위로 변환
	  let leftDay = Math.ceil(leftTime / (1000 * 60 * 60 * 24)); // 1초 = 1000밀리초, 1분은 60초, 1시간은 60분, 1일은 24시간
    
    if (leftDay === 0) {
      return MESSAGE.D_DAY
    } else if (leftDay < 0 || novel.complete_seqno) {
      return MESSAGE.DDAY_COMPLETE 
    } else {
      return MESSAGE.DDAY_COUNT + leftDay
    }
	};

	// 팝업 상태값 변경
	const popupChange = () => {
		if (popup === "viewComNov") {
			return (
				<ViewCompleteNovPopup
					complete_seqno={novel.complete_seqno}
					color={color}
				/>
			);
		} else if (popup === "viewIncomNov") {
			return (
				<ViewIncompleteNovPopup
					changeState={() => setPopup("writeNov")}
					main_seqno={novel.main_seqno}
					setMainNovel={(novel) => setMainNovel(novel)}
					login_id={profile.login_id}
					color={color}
				/>
			);
		} else if (popup === "writeNov") {
			return (
				<WriteSubNovPopup
					mainNovel={mainNovel}
					changeState={() => setPopup("selectTag")}
					setTitleContent={(data) => setTitleContent(data)}
					color={color}
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
					changeState={() => setPopup("novIntro")}
					setTags={(data) => setTags(data)}
					color={color}
				/>
			);
		} else if (popup === "novIntro") {
			return (
				<WriteNovIntroPopup
					setDescription={setDescription}
					changeState={() => setPopup("novCover")}
					color={color}
				/>
			);
		} else if (popup === "novCover") {
			return (
				<SetNovCoverPopup
					setCoverImage={(data) => setCoverImage(data)}
					postSubNovData={postSubNovData}
					color={color}
				/>
			);
		} else if (popup === "viewSubNov") {
			return (
				<ViewSubNovPopup
					// 컴포넌트로 넘겨줄 때 서브 소설 전체가 아닌 클릭한 소설의 고유 index 상태값을 넣어 인덱싱 하여 넘김
					subNovelData={subNovelData[novelIdx]}
					mainNovel={novel}
					user_id={profile.login_id}
					setIsLike={setIsLike}
					getSubNovelData={getSubNovelData}
					color={color}
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
				novelDdayCounter={novelDdayCounter()}
			/>

			{/* 소설 이미지 및 서브 소설 정보 영역 */}
			<NovDetailBox>
				{/* <NovCoverBox> */}
				<NovelCover
					style={{
						backgroundImage: `url(${
							process.env.REACT_APP_COVER_IMAGE_DIRECTORY
						}/${encodeURIComponent(novel.cover_image)})`,
					}}
				/>
				{/* </NovCoverBox> */}
				<NovBoardBox>
					<NovBoardInfoBox>
						{subNovelData.length !== 0 ? (
							<NovelCount>
								{subNovelData.length}
								{MESSAGE.BOARD_COUNT}
							</NovelCount>
						) : (
							<NovelCount>{MESSAGE.WRITE_FIRST_NOVEL}</NovelCount>
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
				mode={modalColorMode(popup)}
				setColor={(data) => setColor(data)}
				setColorInit={() => setColor("#ffffff")}
			>
				{popupChange()}
			</ModalPopup>
		</Wrapper>
	);
};

export default NovDetail;