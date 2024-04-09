// React Package Module
import { useState, useRef, useMemo } from "react";

// Redux Package Module
import { setToastOpen } from "redux/slice";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import { Buttons } from "components/controls";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";
import { useDispatch, useSelector } from "react-redux";
import { usePostSubNovelMutation } from "redux/services/NovelService";
import { setPostNovelData } from "redux/slice";
import { compressImage } from "common/util";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	boxSizing: "border-box",
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

const fileUploaderBtn = (color) => {
	return {
		backgroundColor: "transparent",
		color: color === "#121212" ? "#ffffff" : "#121212",
		border: "none",
		cursor: "pointer",
		display: "block",
		margin: "0 auto",
		fontSize: 15,
	};
};

/** 서브 소설 작성 후 소설 커버 이미지 업로드 하는 팝업 */
const SetNovCoverPopup = (props) => {
	// redux state
	const color = useSelector((state) => state.main.color);
	const novelData = useSelector((state) => state.main.postNovel);

	const [selectedFileName, setSelectedFileName] = useState(""); // 사용자가 선택한 프로필 사진 이름
	const [previewUrl, setPreviewUrl] = useState(""); // 선택한 이미지 Blob데이터의 경로 state

	// rtk query
	const [post] = usePostSubNovelMutation();

	const dispatch = useDispatch();

	const imageUrl = useMemo(() => {
		if (previewUrl !== "") {
			return previewUrl;
		} else {
			return `${process.env.REACT_APP_COVER_IMAGE_DIRECTORY}/cover_basic.jpg`;
		}
	}, [previewUrl]);

	// 파일 업로드 하는 input에 대한 참조를 저장하는 변수 (현재 참조 대상이 없음을 나타내기 위해 초기값 null로 세팅)
	const fileInputRef = useRef(null);

	const fileUploadBtn = () => {
		fileInputRef.current.click();
	};

	const fileUpload = (e) => {
		const file = e.target.files[0];

		dispatch(setPostNovelData({ file: file }));

		setSelectedFileName(file.name); // 선택한 파일명 업데이트

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const postSubNov = async () => {
		let subNovData;

		// 커버 이미지 선택할 경우 폼 데이터 생성
		if (novelData.file !== "cover_basic.jpg") {
			// 선택된 이미지 파일의 확장자명이 jpeg, jpg, png가 아닐 경우 경고문 띄우고 함수 종료
			const ext = novelData.file.type.split("/")[1];
			const allowList = ["jpeg", "jpg", "png"];
			if (!allowList.includes(ext)) {
        dispatch(
          setToastOpen({
            open: true,
            type: "warning",
            message: MESSAGE.ERROR.CHECK_EXT,
          })
        );
        return;
			}

			// 이미지 압축
			const resizingImg = await compressImage(novelData.file);
			dispatch(setPostNovelData({ file: resizingImg }));

			const formData = new FormData();

			Object.keys(novelData).forEach((key) => {
				formData.append(key, novelData[key]);
			});

			subNovData = formData;

			// 커버 이미지 선택없이 나머지 데이터만 전송할 경우
		} else {
			subNovData = novelData;
		}

		await post(subNovData);
	};

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={color === "#121212" ? COLOR.WHITE : COLOR.BLACK}
				name={LABEL.BUTTONS.SUBMIT}
				width={50}
				margin={"-10px 35px 5px auto"}
				onClick={postSubNov}
			/>
			<IntroMsg>{MESSAGE.SELECT_COVER_INTRO}</IntroMsg>
			<ImgBox>
				<ImgDescription>{MESSAGE.BASIC_COVER_INTRO}</ImgDescription>
				<CoverImg
					style={{
						backgroundImage: `url(${imageUrl})`,
						backgroundSize: "100% 100%",
					}}
				/>
				<input
					type="file"
					accept="image/jpg, image/jpeg, image/png"
					onChange={(e) => fileUpload(e)}
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
				<button onClick={fileUploadBtn} style={fileUploaderBtn(color)}>
					{LABEL.BUTTONS.UPLOAD_IMAGE}
				</button>
			</ImgBox>
		</Wrapper>
	);
};

export default SetNovCoverPopup;
