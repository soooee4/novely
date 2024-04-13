// React Package Module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux";
import { setToastOpen, setClickNovel, setModalOpen } from "redux/slice";

// MUI Package Module
import { styled, Box } from "@mui/material";

// Content Component
import { NovelCard } from "components/contents";

// Control Component
import { Buttons, SearchBar } from "components/controls";

// Constant
import { CODE, MESSAGE, COLOR, LABEL } from "common";

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
  margin: "12px 0",
  display: "flex",
  flexWrap: "no-wrap",
});

// 소설 구분 버튼 박스
const DivNovelBtn = styled(Box)({
  display: "flex",
  minHeight: 40,
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

/** 메인화면 Component */
const Main = () => {
  // redux state 정의
  const profile = useSelector((state) => state.main.profile);
  const isLogin = useSelector((state) => state.main.isLogin);
  const delay = useSelector((state) => state.main.delay);

  // 소설 정보 데이터, Modal open/close, Popup State정의
  const [novelData, setNovelData] = useState([]); // 완성 소설 데이터
  const [genre, setGenre] = useState([]); // 장르
  const [filterNovData, setFilterNovData] = useState([]); // 태그 선택에 의해 필터링된 소설 데이터
  const [selectedTag, setSelectedTag] = useState([]); // 선택된 태그
  const [schWord, setSchWord] = useState(""); // Seacrh Bar에서 입력한 검색 단어
  const [searchNovData, setSearchNovData] = useState([]); // Search Bar에서 검색한 소설 데이터
  const [selectedTab, setSelectedTab] = useState("complete");


  // 제목 검색 (완성 소설 탭에서 검색할 경우 complete_novel_title, 미완성 소설 탭에서 검색할 경우 title에서 단어를 찾아 해당 데이터로 업데이트)
  const search = () => {
    setSearchNovData(
      novelData.filter((nov) =>
        nov.complete_novel_title
          ? nov.complete_novel_title.includes(schWord)
          : nov.title.includes(schWord)
      )
    );
  };

  // 소설 데이터 조회(완성 소설) => 찜 / 찜해제 시에도 사용
  const getNovelData = () => {
    // 로그인 상태라면 login_id 넘어가고 아니라면 null값 넘어가도록 처리
    getData("novel/getNovels", { login_id: profile?.login_id })
      .then((data) => {
        setNovelData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 소설 데이터 조회(미완성 소설) => 미완성 소설 탭 클릭 시 실행
  const getIncompleteNovelData = () => {
    getData("novel/getIncompleteNovels", { login_id: profile?.login_id })
      .then((data) => {
        setNovelData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dispatch = useDispatch();

  // 메인 화면 렌더링 시 소설 데이터 조회
  useEffect(() => {
    getNovelData();
  }, []);

  // 작가 권한 첫 로그인 시 작가 소개 입력 모달창 열기
  useEffect(() => {
    if (profile && profile.author_first_login === "Y" && !delay) {
      dispatch(setModalOpen({ open: true, content: "authorFirstLogin", width: 450, height: 420 }));
    }
  }, [profile]);

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
    novelData.forEach((nov) => {
      const check = selectedTag.findIndex(
        (v) => v === nov.genre_1 || v === nov.genre_2
      );
      if (check !== -1) filteringNov.push(nov);
    });

    // 선택된 태그 다시 클릭하여 선택 태그 전부 제거 시 complete novel data 세팅
    if (selectedTag.length === 0) setFilterNovData(novelData);
    else setFilterNovData(filteringNov);
  }, [selectedTag]);

  // 태그 선택 함수(태그 클릭 시 필터링을 위함)
  const settingTag = (tag) => {
    // 이미 선택된 태그인지 체크(존재 여부 및 인덱스 추출)
    const check = selectedTag.findIndex((v) => v === tag);

    // 선택되지 않은 태그일 경우 선택 태그 모음에 추가
    if (check === -1) {
      // 선택된 태그가 3개일 경우
      if (selectedTag.length > 2) {
        dispatch(
          setToastOpen({
            open: true,
            type: "info",
            message: MESSAGE.OVER_SELECTED_TAG,
          })
        );
        return;
      } else {
        setSelectedTag([...selectedTag, tag]);
      }
      // 선택된 태그일 경우 선택 태그 모음에서 삭제
    } else {
      setSelectedTag(selectedTag.filter((tag) => tag !== selectedTag[check]));
    }
  };

  // 검색어 입력 후 검색 시
  useEffect(() => {
    setFilterNovData(searchNovData);
  }, [searchNovData]);

  const navigate = useNavigate();

  // 노벨 카드 클릭 시 소설 상세 페이지 이동
  const goToDetail = (novel) => {
    // 비로그인 상태
    if (!isLogin) {
      dispatch(setModalOpen({ open: true, content: "login", width: 550, height: 340 }));

      // 로그인 상태
    } else {
      navigate("/novel_detail");
      dispatch(setClickNovel(novel));
    }
  };

  return (
    <MainBox>
      {/* SearchBar에 검색어 상태 변경 함수를 내려주고 그 값을 공유받아 세팅 */}
      <SearchBar setSchWord={(word) => setSchWord(word)} onClick={search}  />
      {selectedTab === "complete" && (
        <TagBox>
          {genre.map((list, i) => {
            const isSelected = selectedTag.includes(list.code_name);
            return (
              <Buttons
                key={i}
                type={CODE.BUTTON.TAG}
                name={list.code_name}
                backgroundColor={`#${list.color}`}
                color={COLOR.BLACK}
                fontWeight={
                  selectedTag.findIndex((name) => name === list.code_name) !==
                  -1
                    ? "900"
                    : "500"
                }
                setSelectedTag={(tag) => settingTag(tag)}
                selectedTag={selectedTag}
                border={isSelected ? "1.5px solid black" : "1px solid transparent"}
              />
            );
          })}
        </TagBox>
      )}
      <DivNovelBtn>
        <Buttons
          type={CODE.BUTTON.BASIC}
          backgroundColor={COLOR.WHITE}
          color={COLOR.BLACK}
          name={LABEL.BUTTONS.COMPLETE}
          padding={0}
          setSelectedTab={() => setSelectedTab("complete")}
          getNovelData={() => getNovelData()}
          fontWeight={selectedTab === "complete" && "bolder"}
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
          name={LABEL.BUTTONS.IN_COMPLETE}
          padding={0}
          setSelectedTab={() => setSelectedTab("incomplete")}
          getIncompleteNovelData={() => getIncompleteNovelData()}
          fontWeight={selectedTab === "incomplete" && "bolder"}
        />
      </DivNovelBtn>
      <NovelCardBox>
        {novelData &&
          filterNovData.map((list) => {
            return (
              <NovelCard
                key={list.complete_seqno || list.main_seqno}
                main_seqno={list.main_seqno}
                title={list.complete_novel_title || list.title}
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
                pick_yn={
                  list.main_author_id !== profile?.login_id &&
                  list.sub_author_id !== profile?.login_id &&
                  list.pick_yn
                }
                user_id={profile?.login_id}
                getNovelData={
                  selectedTab === "complete"
                    ? getNovelData
                    : getIncompleteNovelData
                }
                cover_image={list.cover_image}
                onClick={() => goToDetail(list)}
              />
            );
          })}
      </NovelCardBox>
    </MainBox>
  );
};

export default Main;
