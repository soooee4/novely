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

// Constant
import { CODE, LABEL, COLOR } from "common";

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
	const [completeNovData, setCompleteNovData] = useState([]);
	const [inCompleteNovData, setInCompleteNovData] = useState([]);
	const [profile, setProfile] = useState(
		JSON.parse(localStorage.getItem("profile"))
	);
	const [isComplete, setIsComplete] = useState(true);

	// 완성 소설 중 pick_yn이 Y인(찜한) 작품만 가져오기
	useEffect(() => {
		getData("novel/getNovel", { user_id: profile.login_id })
			.then((data) => {
				setCompleteNovData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// !미완성 소설 중 pick_yn이 Y인(찜한) 작품만 가져오기
	useEffect(() => {
		getData("novel/getPickMainNovel", {
			user_id: profile.login_id,
		})
    
			.then((data) => {
        console.log(data.login_id,91)
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
console.log(inCompleteNovData,101)
	return (
		<>
			<MainBox>
				"찜한 작품 페이지"
				<DivNovelBtn>
					<Buttons
						type={CODE.BUTTON.BASIC}
						backgroundColor={COLOR.WHITE}
						color={COLOR.BLACK}
						name={LABEL.BUTTONS.COMPLETE}
						isComplete={() => setIsComplete(true)}
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
						name={LABEL.BUTTONS.IN_COMPLETE}
						isComplete={() => setIsComplete(false)}
						padding={0}
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
			{/* <ModalPopup
        fullWidth
        open={modal}
        width={modalWidth(popup)}
        onClose={closeModal}
        height={modalHeight(popup)}
      >
        {popupChange()}
      </ModalPopup> */}
		</>
	);
};

export default FavoriteNov;
