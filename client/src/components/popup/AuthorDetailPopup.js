import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Constant
import { Box, styled, Typography } from "@mui/material";
import { CODE, LABEL, COLOR } from "common";

import AuthorInfo from "components/contents/AuthorInfo";
import NovelCard from "components/contents/NovelCard";


import { getData } from "common/communication";

// 전체 영역
const Wrapper = styled(Box)({
	width: "99%",
	height: "99%",
	// border: '2px solid orange',
	display: "flex",
  gap: 20,
  paddingTop: 5
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

const AuthorDetailPopup = (props) => {
	const [authorNovelData, setAuthorNovelData] = useState([]);
    
	// 작가에 따른 미완 소설 가져오기
	useEffect(() => {
		getData("novel/getAuthorNovel", { created_user: props.authorId })
			.then(function (data) {
				setAuthorNovelData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const navigate = useNavigate();

	const goToDetail = (novel) => {
			navigate("/novel-detail", { state: { props: novel } });
		};

	return (
		<>
			<Wrapper>
				<AuthorInfo 
          authorNickName={props.authorNickName}
        />
				<NovelCardBox>
					{ authorNovelData.length !== 0 ? authorNovelData.map((list) => {
						return (
							<NovelCard
								key={list.main_seqno}
								title={list.title}
								description={list.description}
								created_date={list.created_date}
								created_user={list.created_user}
                onClick={() => {
                  goToDetail(list)
                  props.closeModal();
                }}
							/>
						);
					})
        : <IsDataInfo>해당 작가님의 미완결 작품이 없어요 :)</IsDataInfo>}
				</NovelCardBox>
			</Wrapper>
		</>
	);
}

export default AuthorDetailPopup;
