// React Package Module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux Package Module
import { useSelector, useDispatch } from "react-redux";
import { setClickNovel, setModalClose } from "redux/slice";

// Constant
import { Box, styled, Typography } from "@mui/material";

// Content Component
import { AuthorInfo, NovelCard } from "components/contents";

// Constant
import { MESSAGE } from "common";

// API
import { getData } from "common/communication";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	gap: 20,
	boxSizing: "border-box",
	paddingBottom: 10,
});

// 소설 컴포넌트 카드 영역
const NovelCardBox = styled(Box)({
	flexGrow: 1,
	height: "100%",
	width: "80%",
	margin: "0 auto",
	display: "flex",
	flexWrap: "wrap",
	overflow: "scroll",
	paddingTop: 10,
	gap: 25,

	// 스크롤바 숨기기
	"&::-webkit-scrollbar": {
		display: "none",
	},

	"& > div": {
		margin: 0,
	},
});

const IsDataInfo = styled(Typography)({
	fontSize: 17,
});

/** 작가 상세 정보를 보여주는 모달 (소설 상세 페이지에서 작가 닉네임 클릭시 해당 팝업 띄워짐) */
const AuthorDetailPopup = () => {
	// redux state 정의
	const profile = useSelector((state) => state.main.profile);
	const { authorId, authorNickname } = useSelector(
		(state) => state.main.clickData
	);

	const [authorNovelData, setAuthorNovelData] = useState([]); // 작성한 메인 소설 데이터
	const [userImg, setUserImg] = useState(""); // 사용자 프로필 이미지
	const [authorInfo, setAuthorInfo] = useState(""); // 작가 소갯말

	const getNovelData = () => {
		getData("novel/getAuthorNovel", {
			created_user: authorId,
			login_id: profile.login_id,
		})
			.then(function (data) {
				setAuthorNovelData(data.novel_data);
				setUserImg(data.user_image);
				setAuthorInfo(data.author_info);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getNovelData();
	}, []);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const goToDetail = (novel) => {
		navigate("/novel_detail");
		dispatch(setClickNovel(novel));
		dispatch(setModalClose());
	};

	return (
		<Wrapper>
			<AuthorInfo
				authorId={authorId}
				authorNickname={authorNickname}
				user_image={userImg}
				authorInfo={authorInfo}
			/>
			<NovelCardBox>
				{authorNovelData.length !== 0 ? (
					authorNovelData.map((list) => {
						return (
							<NovelCard
								key={list.main_seqno}
								main_seqno={list.main_seqno}
								title={list.title}
								description={list.description}
								created_date={list.created_date}
								created_user={list.created_user}
								user_id={profile.login_id} // 여기서 넘어가는 user_id는 해당 소설 찜 여부를 위한 값
								pick_yn={list.pick_yn}
								cover_image={list.cover_image}
								getNovelData={getNovelData}
								onClick={() => {
									goToDetail(list);
								}}
							/>
						);
					})
				) : (
					<IsDataInfo>{MESSAGE.NO_INCOMPLETE_NOV}</IsDataInfo>
				)}
			</NovelCardBox>
		</Wrapper>
	);
};

export default AuthorDetailPopup;
