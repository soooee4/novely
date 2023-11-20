import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Control Component
import Buttons from "components/controls/Button";

// Constant
import { Box, styled, Typography } from "@mui/material";
import { CODE, LABEL, COLOR } from "common";

// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
	// border: "3px solid blue",
	marinTop: "-30px",
});

//textarea 영역
const writeNovText = {
	width: "100%",
	height: "80%",
	resize: "none",
	outline: "none",
	borderRadius: 10,
	padding: 20,
	fontSize: 15,
	boxSizing: "border-box",
	marginBottom: 20,
};

const IntroMsg = styled(Typography)({
	fontSize: 18,
	fontWeight: "bolder",
	textAlign: "center",
	marginBottom: 30,
});

/** 작가 권한일 시 메인 소설 작성 후 소설 소개를 쓰는 컴포넌트 (내 작품 페이지에서 새 소설 쓰기 버튼, 작성 후 다음 버튼 클릭 시 해당 팝업 띄워줌) */
const AuthorWriteIntroPopup = (props) => {

	const [description, setDescription] = useState("");

	// console.log(allMainNovel[0]);

	//! 코드 변경 필요ㅜㅜ 아래 post 함수에 함께 넣을 경우 바로 반영이 안되는 현상 배열이 최신순으로 정렬되기 때문에 방금 post한 소설을 감지하는 방법으로 현재 목록 중 0번째 인덱스 배열 뽑기 위해 사용
	// useEffect(() => {
	// 	getData("novel/getAuthorNovel", {
	// 		created_user: props.profile.login_id,
	// 	})
	// 		.then(function (data) {
	// 			setAllMainNovel(data);
	// 			props.setPostedNovel(allMainNovel[0]);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, [isPosted]);

	const inputDescription = (e) => {
		setDescription(e.target.value);
	};

	// 저장 후 다음 버튼 눌렀을 때 NovDetail 페이지에 있는 (서버로 보낼) 상태값에 데이터 세팅
	const setMainNovelData = () => {
		props.setDescription({
			description: description,
		});
		alert("제출이 완료되었어요!");
		// goToDetail();
	};

	// 메인소설 등록 함수
	// const postMainNovel = () => {
	// 	postData("novel/postMainNovel", {
	// 		title: props.regditMainNovData.title,
	// 		content: props.regditMainNovData.content,
	// 		description: props.regditMainNovData.description,
	// 		created_user: props.profile.login_id,
	// 	})
	// 		.then((data) => {
	// 			setIsPost(data);
	// data &&
	// 	getData("novel/getAuthorNovel", {
	// 		created_user: props.profile.login_id,
	// 	})
	// 		.then(function (data) {
	// 			setAllMainNovel(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={COLOR.BLACK}
				name={LABEL.BUTTONS.SUBMIT}
				// width={100}
				margin={"-10px -5px 0px auto"}
				// post 요청 보내기 위한 데이터
				setMainNovelData={setMainNovelData}
				// 메인 소설 등록 함수
				// postMainNovel={postMainNovel}
				//버튼 클릭 시 AuthorMyNov의 isPost 상태값 바꿔주는 함수
				isPost={() => props.setIsPost(true)}
			/>
			<IntroMsg>
				다채로운 결말을 위해서 <br /> 소설 도입부에 대해 간단하게 소개해주세요
				:)
			</IntroMsg>
			<textarea style={writeNovText} onChange={inputDescription} />
		</Wrapper>
	);
};

export default AuthorWriteIntroPopup;
