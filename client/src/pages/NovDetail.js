// React Package Module
import { useEffect, useState } from "react";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux";
import { setReset, setSubNovels } from "redux/slice";

// MUI Package Module
import { Box, Typography, styled } from "@mui/material";

// Content Component
import { NovelInfo, SubNovelTable } from "components/contents";

// Control Component
import { Buttons } from "components/controls";

// Popup Component
import { ModalPopup } from "components/popup";

// Constant
import { CODE, LABEL, MESSAGE } from "common";

// util
import { novelDdayCounter } from "common/util";

// API
import { getData } from "common/communication";

/** 영역 STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	display: "flex",
	flexDirection: "column",
	boxSizing: "border-box",
	paddingLeft: 140,
	paddingRight: 140,
});

// 소설 커버 이미지, 소설 목록 게시판 영역
const NovDetailBox = styled(Box)({
	display: "flex",
});

// 소설 커버 이미지 영역
const NovelCover = styled(Box)({
	minWidth: 215,
	height: 320,
	marginRight: 35,
	marginLeft: 10,
	marginTop: 10,
	borderRadius: 15,
	backgroundColor: "pink",
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
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
	// redux state 정의
	const profile = useSelector((state) => state.main.profile);
	const novel = useSelector((state) => state.main.clickNovel);
	const subNovels = useSelector((state) => state.main.subNovels);
	const reset = useSelector((state) => state.main.reset);

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

	const [order, setOrder] = useState("latest"); // 서브 소설 정렬 순(최신순 / 인기순)

	const dispatch = useDispatch();

	// 소설에 딸린 서브 소설 가져오기
	const getSubNovelData = () => {
		getData("novel/getSubNovel", {
			main_novel_seqno: novel.main_seqno,
			user_id: profile.login_id,
		})
			.then(function (data) {
				dispatch(setSubNovels(data));

				// 재조회 시 flag 상태 원복
				dispatch(setReset(false));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 서브소설 데이터 조회
	useEffect(() => {
		getSubNovelData();
	}, [novel.main_seqno, reset]);

	return (
		<Wrapper>
			{/* 소설 정보 헤더 영역 */}
			<NovelInfo
				novelDdayCounter={novelDdayCounter(
					novel.created_date,
					novel.complete_seqno
				)}
			/>

			{/* 소설 이미지 및 서브 소설 정보 영역 */}
			<NovDetailBox>
				<NovelCover
					style={{
						backgroundImage: `url(${
							process.env.REACT_APP_COVER_IMAGE_DIRECTORY
						}/${encodeURIComponent(novel.cover_image)})`,
					}}
				/>
				<NovBoardBox>
					<NovBoardInfoBox>
						{subNovels.length !== 0 ? (
							<NovelCount>
								{subNovels.length}
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
								fontWeight={order === "popular" ? "normal" : "bold"}
								onClick={() => setOrder("latest")}
							/>
							<Buttons
								type={CODE.BUTTON.BASIC}
								name={LABEL.BUTTONS.POPULAR}
								height={10}
								fontWeight={order === "popular" ? "bold" : "normal"}
								onClick={() => setOrder("popular")}
							/>
						</FilterBox>
					</NovBoardInfoBox>
					<SubNovelTable order={order} />
				</NovBoardBox>
			</NovDetailBox>

			{/* 모달 팝업 영역 */}
			<ModalPopup />
		</Wrapper>
	);
};

export default NovDetail;