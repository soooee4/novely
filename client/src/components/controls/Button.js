// MUI Package Module
import { Button, styled } from "@mui/material";

// Constant
import { CODE, COLOR } from "common";

// 기본 버튼
const BasicBtn = styled(Button)({
	color: COLOR.BLACK,
	borderRadius: 5,
	"&:hover": {
		backgroundColor: "transparent",
		fontWeight: "bolder",
	},
});

// 로그인, 로그아웃 버튼
const BorderBtn = styled(Button)({
	height: 10,
	fontWeight: 700,
	border: `1px solid ${COLOR.BLACK}`,
	borderRadius: 7,
	padding: 15,
	// "&:hover": {
	// 	fontWeight: "bolder",
	// 	fontSize: 15,
	// 	padding: "15px 0",
	// },
});

// 태그 버튼
const TagBtn = styled(Button)({
	height: 17,
	borderRadius: 8,
	color: COLOR.BLACK,
	fontSize: 10,
	marginLeft: 5,
  marginBottom: 4,
  boxSizing: "border-box"
});

// Button Component
const Buttons = (props) => {
	if (props.type === CODE.BUTTON.BASIC) {
		return (
			<BasicBtn
				disableRipple
				onClick={() => {
					props.showModal && props.showModal();                               // 모달창 열기
					props.changeState && props.changeState();                           // 팝업 내용 변경
					props.navigate && props.navigate();                                 // 페이지 이동
					props.postSubNovel && props.postSubNovel();         	              // 서브 소설 데이터 서버 전송
					props.onClickNextBtn && props.onClickNextBtn();                     // 팝업 '다음' 버튼 클릭 시
					props.postSubDesc && props.postSubDesc();           	              // Description 데이터 페이지에 세팅
					props.isComplete && props.isComplete();                             // '내 작품' 페이지 완성/미완성 소설 탭 클릭
					props.goToWrite && props.goToWrite();                               // '소설 상세 보기' 팝업 이어쓰기 버튼 클릭
					props.postAuthorNovel && props.postAuthorNovel();                   // 메인 소설 데이터 페이지로 전송
					props.postMainNovel && props.postMainNovel();                       // 메인 소설 데이터 서버 전송
					props.sortPopular && props.sortPopular();                           // 서브 소설 인기순 정렬
					props.sortLatest && props.sortLatest();                             // 서브 소설 최신순 정렬
					props.likeSubNovel && props.likeSubNovel();                         // 서브 소설 투표하기
					props.onEditProfile && props.onEditProfile();                       // 프로필 수정
					props.setSelectedTab && props.setSelectedTab();                     // 헤더나 필터 탭 클릭 시 클릭한 탭 색상 변경
					props.postSubNovData && props.postSubNovData();                     // 서브 소설 데이터 서버 전송
					props.enter && props.enter();							                          // 키보드 엔터키 실행
					props.patchAuthorInfo && props.patchAuthorInfo();                   // 유저 정보 수정
					props.getNovelData && props.getNovelData();                         // 완성 소설 데이터 조회(메인 페이지)
					props.getIncompleteNovelData && props.getIncompleteNovelData();     // 미완성 소설 데이터 조회(메인 페이지)
					props.getPickNovels && props.getPickNovels();                       // 찜한 완성 소설 데이터 조회(찜한 작품 페이지)
					props.getPickIncompleteNovels && props.getPickIncompleteNovels();   // 찜한 미완성 소설 데이터 조회(찜한 작품 페이지)
					props.getMyCompleteNovel && props.getMyCompleteNovel();             // 로그인 아이디가 작성한 완성 소설 조회(내 작품 페이지)
					props.getMyIncompleteNovel && props.getMyIncompleteNovel();         // 로그인 아이디가 작성한 미완성 소설 조회(내 작품 페이지)
					props.goToNext && props.goToNext();    
          props.goToMyPage && props.goToMyPage();                            // 메인 소설 title, content 입력 후 다음 버튼 누를 시 실행                   
					// props.setMainNovelData && props.setMainNovelData();
					// props.isPost && props.isPost();
				}}
				style={{
					width: props.width,
					height: props.height,
					margin: props.margin,
					padding: props.padding,
					fontSize: props.fontSize,
					fontWeight: props.fontWeight,
          color: props.color
				}}
			>
				{props.name}
			</BasicBtn>
		);
	} else if (props.type === CODE.BUTTON.TAG) {
		return (
			<TagBtn
				disableRipple
				onClick={() => {
					props.onSelectTags && props.onSelectTags();
					props.onClick && props.onClick();
          			props.setSelectedTag && props.setSelectedTag(props.name);
				}}
				style={{
					backgroundColor: props.backgroundColor,
					margin: props.margin,
					padding: props.padding,
					fontSize: props.fontSize,
          color: props.color,
          fontWeight: props.fontWeight,
          border: props.border
				}}
			>
				# {props.name}
			</TagBtn>
		);
	} else if (props.type === CODE.BUTTON.BORDER) {
		return (
			// 여러개의 함수 넣기
			<BorderBtn
				disableRipple
				onClick={() => {
					// props로 넘어온 값이 null, undefined가 아닐 경우에만 해당 함수 실행하도록 조건 부여
					props.showModal && props.showModal();
					props.changeState && props.changeState();
					props.onSubmit && props.onSubmit();
					props.logout && props.logout();
				}}
				style={{
					backgroundColor: props.backgroundColor,
					color: props.color,
					width: props.width,
					height: props.height,
					margin: props.margin,
					padding: props.padding,
					fontSize: props.fontSize,
				}}
			>
				{props.name}
			</BorderBtn>
		);
	}
};

export default Buttons;