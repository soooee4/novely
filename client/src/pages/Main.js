// React Package Module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Package Module
import { styled, Box } from "@mui/material";

// Content Component
import NovelCard from "components/contents/NovelCard";

// Control Component
import Buttons from "components/controls/Button";
import SearchBar from "components/controls/Search";

// Popup Component
import ModalPopup from "components/popup/ModalPopup";
import LoginPopup from "components/popup/LoginPopup";
import JoinPopup from "components/popup/JoinPopup";

// Constant
import { CODE, MESSAGE } from "common";

// util

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

// 검색창 하단 장르 태그 박스
const TagBox = styled(Box)({
	width: "100%",
	height: 25,
	margin: "0 auto",
	marginBottom: 12,
	marginTop: 8,
});

// 소설 컴포넌트 카드 영역
const NovelCardBox = styled(Box)({
	flexGrow: 1,
	width: "100%",
	margin: "0 auto",
	display: "flex",
	flexWrap: "wrap",
});

/** 메인화면 Component */
const Main = () => {
	// 소설 정보 데이터, Modal open/close, Popup State정의
	const [novelData, setNovelData] = useState([]);
	const [modal, setModal] = useState(false);
	const [popup, setPopup] = useState("login");
	const [isLogin, setIsLogin] = useState(localStorage.getItem("id") ? true : false);
	const [genre, setGenre] = useState([]);
	const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")));
  const [filterNovData, setFilterNovData] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);

  const [schWord, setSchWord] = useState("");
  const [searchD, setSearchD] = useState([]);

  const search = () => {
    setSearchD(novelData.filter(nov => nov.complete_novel_title.includes(schWord)));
  };

  // 모달창 닫기
	const closeModal = () => {
		setModal(false);
	};

	const popupChange = () => {
		if (popup === "login") {
			return (
				<LoginPopup
					changeState={() => setPopup("join")}
					closeModal={closeModal}
					isLogin={() => setIsLogin(true)}
				/>
			);
		} else if (popup === "join") {
			return <JoinPopup changeState={() => setPopup("profile")} />;
		}
	};

	// 소설 데이터 조회(완성 소설) => 찜 / 찜해제 시에도 사용
	const getNovelData = () => {
    // 로그인 상태라면 login_id 넘어가고 아니라면 null값 넘어가도록 처리
		getData("novel/getNovel", { user_id: profile?.login_id})
			.then((data) => {
				setNovelData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 메인 화면 렌더링 시 소설 데이터 조회
	useEffect(() => {
		getNovelData();
	}, []);

	// 장르 태그 조회
	useEffect(() => {
		getData("common/genre")
			.then((data) => {
				setGenre(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

  // 새로고침 시 태그 필터링 제거
  useEffect(() => {
    setFilterNovData(novelData);
  }, [novelData]);

  // 태그 선택 시 
  useEffect(() => {
    // 필터링된 소설 정보를 담을 배열
    const filteringNov = [];

    // 조회된 완료 소설 중 선택된 장르 태그에 해당하는 소설 정보를 필터링된 소설 배열에 넣음
    novelData.forEach(nov => {
      const check = selectedTag.findIndex(v => v === nov.genre_1 || v === nov.genre_2);
      if (check !== -1) filteringNov.push(nov);
    });

    // 선택된 태그 다시 클릭하여 선택 태그 전부 제거 시 complete novel data 세팅
    if (selectedTag.length === 0) setFilterNovData(novelData);
    else setFilterNovData(filteringNov);
  }, [selectedTag]);

  // 태그 선택 함수(태그 클릭 시 필터링을 위함)
  const settingTag = (tag) => {
    // 이미 선택된 태그인지 체크(존재 여부 및 인덱스 추출)
    const check = selectedTag.findIndex(v => v === tag);
    const index = selectedTag.findIndex(v => v === tag);  

    // 선택되지 않은 태그일 경우 선택 태그 모음에 추가
    if (check === -1) {
      // 선택된 태그가 3개일 경우
      if (selectedTag.length > 2) {
        alert(MESSAGE.OVER_SELECTED_TAG);
        return;
      } else {
        setSelectedTag([ ...selectedTag, tag ]);
      }
    // 선택된 태그일 경우 선택 태그 모음에서 삭제
    } else {
      setSelectedTag(selectedTag.filter(tag => tag !== selectedTag[index]));
    }
  };

  // 검색어 입력 후 검색 시
  useEffect(() => {
    setFilterNovData(searchD);
  }, [searchD]);

	// 전체 소설 데이터에서 특정 아이디가 작성한 메인소설을 뽑을 때 (작가권한 내 작품 페이지에 넘겨줄 데이터)

	const navigate = useNavigate();

  // 노벨 카드 클릭 시 소설 상세 페이지 이동
	const goToDetail = (novel) => {
    // 비로그인 상태
		if (!localStorage.getItem("profile")) {
			setModal(true);

		// 로그인 상태
		} else {
			navigate("/novel-detail", { state: { props: novel } });
		}
	};

	return (
		<MainBox>
			<ModalPopup
				open={modal}
				width={600}
				height={400}
				onClose={() => setModal(false)}
			>
				{popupChange()}
			</ModalPopup>
			<SearchBar setSchWord={(word) => setSchWord(word)} onClick={search} />
			<TagBox>
				{genre.map((list, i) => {
					return (
						<Buttons
							key={i}
							type={CODE.BUTTON.TAG}
							name={list.code_name}
							backgroundColor={`#${list.color}`}
              				setSelectedTag={(tag) => settingTag(tag)}
						/>
					);
				})}
			</TagBox>
			<NovelCardBox>
				{novelData &&
					filterNovData.map((list) => {
						return (
							<NovelCard
								key={list.complete_seqno}
								main_seqno={list.main_seqno}
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
								pick_yn={list.pick_yn}
								user_id={profile?.login_id}
								onClick={() => goToDetail(list)}
								getNovelData={getNovelData}
							/>
						);
					})}
			</NovelCardBox>
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