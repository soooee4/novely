// React Package Module
import { useState, useRef } from "react";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	boxSizing: "border-box",
	paddingTop: 40,
	//  boxShadow: "inset 0 0 3px 3px blue"
});

const ImgBox = styled(Box)({
	width: "100%",
	height: 500,
	boxSizing: "border-box",
	marginBottom: 5,
	display: "flex",
	flexDirection: "column",
});

const CoverImg = styled(Box)({
	width: 270,
	height: 320,
	display: "flex",
	flexDirection: "column",
	boxSizing: "border-box",
	backgroundColor: COLOR.GREEN_TEA,
	margin: "8px auto",
	borderRadius: 20,
});

const ImgDescription = styled(Typography)({
	fontSize: 11,
	color: COLOR.GRAY,
	fontWeight: "bold",
	margin: "0 auto",
});

const IntroMsg = styled(Typography)({
	fontSize: 18,
	fontWeight: "bolder",
	textAlign: "center",
	marginBottom: 20,
});

const fileUploaderBtn = {
	backgroundColor: "white",
	color: "black",
	border: "none",
	cursor: "pointer",
	display: "block",
	margin: "0 auto",
	fontSize: 15,
};

/** 서브 소설 작성 후 소설 커버 이미지 업로드 하는 팝업 */
const SetNovCoverPopup = (props) => {
	// 선택한 이미지 Blob데이터의 경로 state
	const [coverImgSrc, setCoverImgSrc] = useState(null);

	const [selectedFileName, setSelectedFileName] = useState(""); // 사용자가 선택한 프로필 사진 이름

	// Blob 이미지의 경로를 읽어 state에 세팅
	const setPreviewImg = (e) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setCoverImgSrc(reader.result);
		};
		reader.readAsDataURL(e);
	};

	// 파일 업로드 하는 input에 대한 참조를 저장하는 변수 (현재 참조 대상이 없음을 나타내기 위해 초기값 null로 세팅)
	const fileInputRef = useRef(null);

	const fileUploadBtn = () => {
		fileInputRef.current.click();
	};

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={props.color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
				name={LABEL.BUTTONS.SUBMIT}
				width={100}
				margin={"-10px -5px 0px auto"}
				postSubNovData={props.postSubNovData}
			/>
			<IntroMsg>{MESSAGE.SELECT_COVER_INTRO}</IntroMsg>
			<ImgBox>
				<ImgDescription>{MESSAGE.BASIC_COVER_INTRO}</ImgDescription>
				<CoverImg
					style={{
						backgroundImage: `url(${process.env.REACT_APP_COVER_IMAGE_DIRECTORY}/cover_basic.jpg)`,
						backgroundSize: "100% 100%",
					}}
				/>
				<input
					type="file"
					accept="image/jpg, image/jpeg, image/png"
					onChange={(e) => {
						props.setCoverImage({ file: e.target.files[0] }); // NovDetail 페이지의 redgitNovData에 이미지 데이터 세팅
						setPreviewImg(e.target.files[0]);
						setSelectedFileName(e.target.files[0].name); // 선택한 파일명 업데이트
					}}
					style={{ display: "none" }}
					ref={fileInputRef}
				/>
				{/* 사용자가 선택한 파일명 */}
				{selectedFileName && (
					<p style={{ fontSize: 12, textAlign: "center", margin: "0 auto" }}>
						{selectedFileName}
					</p>
				)}
				{/* 커스텀한 파일 업로더 버튼 */}
				<button onClick={fileUploadBtn} style={fileUploaderBtn}>
					{LABEL.BUTTONS.UPLOAD_IMAGE}
				</button>
			</ImgBox>
		</Wrapper>
	);
};

export default SetNovCoverPopup;
