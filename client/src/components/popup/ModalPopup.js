import { useState } from "react";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux";
import { setModalClose } from "redux/slice";

// MUI Package Module
import {
	Dialog,
	DialogContent,
	createTheme,
	ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { EditProfilePopup, JoinPopup, LoginPopup } from "components/popup";

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
		default:
			break;
	}
	return Popup;
};

/** 모든 팝업 컴포넌트의 부모가 되는 기본 모달 컴포넌트 */
const ModalPopup = (props) => {
	const modal = useSelector((state) => state.main.modal);
	const { open, content } = modal;

	const Content = _getPopupComp(content);

	// fullWidth 속성 props에 추가하여 fullWidth일 때만 너비 100%로 설정 (novel-detail 소설 보기, 쓰기)
	const { height, onClose, width, popupState, fullWidth, mode } =
		props;

	const [colorMode, setColorMode] = useState("#ffffff");

	const profile = useSelector((state) => state.main.profile);

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
			onClose();
			setColorMode("#ffffff");
			props.setColorInit && props.setColorInit();
		}
	};

	const brightDark = (click) => {
		let color;
		switch (click) {
			case 1:
				color = "#ffffff";
				break;
			case 2:
				color = "#f2e8cf";
				break;
			case 3:
				color = "#121212";
				break;
			default:
				color = "#ffffff";
		}
		setColorMode(color);
		props.setColor(color);
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
						backgroundColor: colorMode,
						// 글자색도 마찬가지로 colorMode 상태값에 따라 동적으로 설정
						color: colorMode === "#121212" ? "white" : "black",
					},
				}}
			>
				{/* CloseIcon을 눌렀을 때 join팝업일 경우 로컬 스토리지에 profile이 있으면 새로고침. */}
				{mode && (
					//  각 테마 선택 버튼을 누를 시 brightDark 파라미터에 해당 값 넣어주기
					<div style={{ display: "flex", margin: "10px 0 0 10px", gap: 5 }}>
						<button
							style={{
								width: 18,
								height: 18,
								borderRadius: "50%",
								backgroundColor: "#ffffff",
							}}
							onClick={() => brightDark(1)}
						></button>
						<button
							style={{
								width: 18,
								height: 18,
								borderRadius: "50%",
								backgroundColor: "#f2e8cf",
							}}
							onClick={() => brightDark(2)}
						></button>
						<button
							style={{
								width: 18,
								height: 18,
								borderRadius: "50%",
								backgroundColor: "#121212",
							}}
							onClick={() => brightDark(3)}
						></button>
					</div>
				)}
				<CloseIcon
					sx={{
						padding: "11px 13px 0px 0px",
						marginLeft: "auto",
						position: "absolute",
						right: 10,
						top: 3,
						color: colorMode === "#121212" ? "white" : "black",
						":hover": {
							cursor: "pointer",
						},
					}}
					onClick={() => {
						dispatch(setModalClose());
						setColorMode("#ffffff");
						props.setColorInit && props.setColorInit();
						popupState === "join" && profile.login && window.location.reload();
					}}
				/>
				<DialogContent
					sx={{
						boxSizing: "border-box",
						width: fullWidth ? "100%" : width,
						height: height,
						backgroundColor: colorMode,
					}}
				>
					{open && <Content />}
				</DialogContent>
			</Dialog>
		</ThemeProvider>
	);
};

export default ModalPopup;
