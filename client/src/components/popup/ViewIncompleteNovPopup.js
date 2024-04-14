// React Package Module
import { useEffect, React } from "react";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

// Constant
import { CODE, LABEL, COLOR } from "common";

// API
import { getData } from "common/communication";
import { setClickNovel, setModalOpen } from "redux/slice";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	paddingRight: "1.5%",
	boxSizing: "border-box",
	paddingTop: "20px",
	height: "100%",
});

// 제목, 이어쓰기 버튼 영역
const HeaderBox = styled(Box)({
	width: "100%",
	display: "flex",
	boxSizing: "border-box",
	flexShrink: 0,
});

const Title = styled(Typography)({
	marginBottom: 15,
	fontSize: 18,
	fontWeight: "bold",
});

const Content = styled(Typography)({
	fontSize: 15,
	whiteSpace: "pre-wrap",
  marginRight: 25
});

const ScrollBox = styled(Box)({
	overflow: "auto",
	height: "100%",

	"&::-webkit-scrollbar": {
		width: 7,
	},
	"&::-webkit-scrollbar-thumb": {
		background: "#aaa",
		borderRadius: 5,
	},
	"&::-webkit-scrollbar-track": {
		backgroundColor: "transparent",
	},
});

/** 미완성 작품 (메인 소설) 읽기 컴포넌트 (작품 상세 페이지에서 view 버튼 클릭 시 미완성작일 경우 해당 팝업 띄워줌) */
const ViewIncompleteNovPopup = (props) => {
	// redux state 정의(로그인 유저 프로필, 클릭한 메인 소설 정보)
	const profile = useSelector((state) => state.main.profile);
	const clickNovel = useSelector((state) => state.main.clickNovel);
	const color = useSelector((state) => state.main.color);

	const { main_seqno, title, content, created_user } = clickNovel;

	const dispatch = useDispatch();

	// 미완성 소설 보기
	useEffect(() => {
		getData("novel/getMainNovel", { novel_seqno: main_seqno })
			.then(function (data) {
				dispatch(setClickNovel(data[0]));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Wrapper>
			<HeaderBox>
				<Title>{title}</Title>

				{created_user !== profile.login_id && (
					<Buttons
						type={CODE.BUTTON.BASIC}
						backgroundColor={COLOR.WHITE}
						color={color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
						name={LABEL.BUTTONS.GOTOWRITE}
						margin={"-30px 0px 0px auto"}
						padding={0}
						setModalOpen={() =>
							dispatch(
								setModalOpen({
									open: true,
									content: "writeSubNov",
									fullwidth: true,
									width: "100%",
									height: "90vh",
								})
							)
						}
					/>
				)}
			</HeaderBox>
			<ScrollBox>
				<Content>
					{content &&
						content.split("\\n").map((line, i) => (
							<>
								{line}
								<br />
							</>
						))}
				</Content>
			</ScrollBox>
		</Wrapper>
	);
};

export default ViewIncompleteNovPopup;
