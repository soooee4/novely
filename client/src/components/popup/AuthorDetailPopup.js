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
	width: "99%",
	height: "99%",
	// border: '2px solid orange',
	display: "flex",
	gap: 20,
	paddingTop: 5,
});

// 소설 컴포넌트 카드 영역
const NovelCardBox = styled(Box)({
	flexGrow: 1,
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
	const [authorNovelData, setAuthorNovelData] = useState([]);
	const [userImg, setUserImg] = useState("");
	const [profile, setProfile] = useState(
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
                // 여기서 넘어가는 user_id는 해당 소설 찜 여부를 위한 값
								user_id={profile.login_id} 
								pick_yn={list.pick_yn}
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
