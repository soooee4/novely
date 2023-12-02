// React Package Module
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Constant
import { Box, styled, Typography } from "@mui/material";

// Content Component
import AuthorInfo from "components/contents/AuthorInfo";
import NovelCard from "components/contents/NovelCard";

// Constant
import { MESSAGE } from "common";

// API
import { getData } from "common/communication";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "98%",
	height:"98%",
	display: "flex",
	gap: 20,
	// paddingTop: 5,
  // border: '2px solid blue'
});

// 소설 컴포넌트 카드 영역
const NovelCardBox = styled(Box)({
	flexGrow: 1,
  height: "100%",
	width: "80%",
	margin: "0 auto",
	display: "flex",
	flexWrap: "wrap",

});

const IsDataInfo = styled(Typography)({
	fontSize: 17,
  
});

/** 작가 상세 정보를 보여주는 모달 (소설 상세 페이지에서 작가 닉네임 클릭시 해당 팝업 띄워짐) */
const AuthorDetailPopup = (props) => {
	const [authorNovelData, setAuthorNovelData] = useState([]);   // 작성한 메인 소설 데이터
	const [userImg, setUserImg] = useState("");                   // 사용자 프로필 이미지
	const [profile, setProfile] = useState(                       // 로컬스토리지에 저장된 사용자 정보
		JSON.parse(localStorage.getItem("profile"))
	);

	const getNovelData = () => {
		getData("novel/getAuthorNovel", {
			created_user: props.authorId,
			login_id: profile.login_id,
		})
			.then(function (data) {
				setAuthorNovelData(data.novel_data);
				setUserImg(data.user_image);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getNovelData();
	}, []);

	const navigate = useNavigate();

	const goToDetail = (novel) => {
		navigate("/novel-detail", { state: { props: novel } });
	};

	console.log(authorNovelData, 777)

	return (
		<Wrapper>
			<AuthorInfo
				authorNickName={props.authorNickName}
				authorId={props.authorId}
				user_image={userImg}
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
								user_id={profile.login_id}       // 여기서 넘어가는 user_id는 해당 소설 찜 여부를 위한 값
								pick_yn={list.pick_yn}
								cover_image={list.cover_image}
								getNovelData={getNovelData}
								onClick={() => {
									goToDetail(list);
									props.closeModal();
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
