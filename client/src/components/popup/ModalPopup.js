import { useState } from "react";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux";
import { setColor, setModalClose, setPostNovelData } from "redux/slice";

// MUI Package Module
import {
	Dialog,
	DialogContent,
	createTheme,
	ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
	AuthorDetailPopup,
	AuthorFirstLoginPopup,
	AuthorWriteNovPopup,
	EditProfilePopup,
	JoinPopup,
	LoginPopup,
	SelectTagPopup,
	SetNovCoverPopup,
	ViewCompleteNovPopup,
	ViewIncompleteNovPopup,
	ViewSubNovPopup,
	WriteNovIntroPopup,
	WriteSubNovPopup,
	AuthorWriteIntroPopup,
} from "components/popup";

const _getPopupComp = (content) => {
	let Popup;
	switch (content) {
		case "login":
			Popup = LoginPopup;
			break;
		case "join":
			Popup = JoinPopup;
			break;
		case "editProfile":
			Popup = EditProfilePopup;
			break;
		case "authorFirstLogin":
			Popup = AuthorFirstLoginPopup;
			break;
		case "authorWriteNov":
			Popup = AuthorWriteNovPopup;
			break;
		case "viewComNov":
			Popup = ViewCompleteNovPopup;
			break;
		case "viewIncomNov":
			Popup = ViewIncompleteNovPopup;
			break;
		case "writeSubNov":
			Popup = WriteSubNovPopup;
			break;
		case "authorDetail":
			Popup = AuthorDetailPopup;
			break;
		case "selectTag":
			Popup = SelectTagPopup;
			break;
		case "novIntro":
			Popup = WriteNovIntroPopup;
			break;
		case "novCover":
			Popup = SetNovCoverPopup;
			break;
		case "viewSubNov":
			Popup = ViewSubNovPopup;
			break;
		case "authorWriteIntro":
			Popup = AuthorWriteIntroPopup;
			break;

		// defalut
		default:
			break;
	}
	return Popup;
};

// 배경색 ON/OFF 설정
const modalColorMode = (content) => {
	let mode;
	switch (content) {
		case "viewComNov":
			mode = true;
			break;
		case "viewIncomNov":
			mode = true;
			break;
		case "viewSubNov":
			mode = true;
			break;
		case "writeNov":
			mode = true;
			break;
		case "writeSubNov":
			mode = true;
			break;
		case "authorWriteNov":
			mode = true;
			break;
		default:
			mode = false;
	}
	return mode;
};

/** 모든 팝업 컴포넌트의 부모가 되는 기본 모달 컴포넌트 */
const ModalPopup = () => {
	// redux state 정의
	const modal = useSelector((state) => state.main.modal);
	const color = useSelector((state) => state.main.color);
	const profile = useSelector((state) => state.main.profile);

	// modal 속성
	// fullWidth 속성 props에 추가하여 fullWidth일 때만 너비 100%로 설정 (novel-detail 소설 보기, 쓰기)
	const { open, content, width, height, fullWidth } = modal;

	// modal 내 content 설정
	const Content = _getPopupComp(content);

	// dispatch 생성
	const dispatch = useDispatch();

	// 모든 모달창 뒷 배경 투명도 조절을 위한 테마 객체 생성 (전체 스타일링 적용)
	const theme = createTheme({
		components: {
			MuiDialog: {
				styleOverrides: {
					root: {
						backgroundColor: "rgba(0, 0, 0, 0.7)",
					},
				},
			},
		},
	});

	// Esc 버튼 누를 시 모달 창 닫기
	const pressEsc = (e) => {
		if (e.key === "Escape") {
			dispatch(setModalClose());
			dispatch(setPostNovelData({ clear: true }));
			dispatch(setColor("#ffffff"));
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Dialog
				onKeyDown={pressEsc}
				open={open}
				fullWidth={fullWidth}
				PaperProps={{
					style: {
						maxWidth: "100%",
						width: width,
						// 배경색을 colorMode 상태값에 따라 동적으로 설정
						backgroundColor: color,

						// 글자색도 마찬가지로 colorMode 상태값에 따라 동적으로 설정
						color: color === "#121212" ? "white" : "black",
					},
				}}
			>
				{modalColorMode(content) && (
					//  각 테마 선택 버튼을 누를 시 brightDark 파라미터에 해당 값 넣어주기
					<div style={{ display: "flex", margin: "10px 0 0 10px", gap: 5 }}>
						<button
							style={{
								width: 18,
								height: 18,
								borderRadius: "50%",
								backgroundColor: "#ffffff",
							}}
							onClick={() => dispatch(setColor(1))}
						></button>
						<button
							style={{
								width: 18,
								height: 18,
								borderRadius: "50%",
								backgroundColor: "#f2e8cf",
							}}
							onClick={() => dispatch(setColor(2))}
						></button>
						<button
							style={{
								width: 18,
								height: 18,
								borderRadius: "50%",
								backgroundColor: "#121212",
							}}
							onClick={() => dispatch(setColor(3))}
						></button>
					</div>
				)}
				<CloseIcon
					sx={{
						fontSize: 35,
						padding: "11px 13px 0px 0px",
						marginLeft: "auto",
						position: "absolute",
						right: 10,
						top: 3,
						color: color === "#121212" ? "white" : "black",

						":hover": {
							cursor: "pointer",
						},
					}}
					onClick={() => {
						dispatch(setModalClose());
						dispatch(setPostNovelData({ clear: true }));
						dispatch(setColor("#ffffff"));
					}}
				/>
				<DialogContent
					sx={{
						boxSizing: "border-box",
						width: fullWidth ? "100%" : width,
						height: height,
						backgroundColor: color,
					}}
				>
					{open && <Content />}
				</DialogContent>
			</Dialog>
		</ThemeProvider>
	);
};

export default ModalPopup;
