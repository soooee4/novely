// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";
import { useState } from "react";

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
	marginBottom: 30,
});

/** 서브 소설 작성 후 소설 커버 이미지 업로드 하는 팝업 */
const SetNovCoverPopup = (props) => {
  // 선택한 이미지 Blob데이터의 경로 state
  const [coverImgSrc, setCoverImgSrc] = useState(null);

  // Blob 이미지의 경로를 읽어 state에 세팅
  const setPreviewImg = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImgSrc(reader.result);
    }
    reader.readAsDataURL(e);
  };

	return (
    <Wrapper>
      <Buttons
        type={CODE.BUTTON.BASIC}
        backgroundColor={COLOR.WHITE}
        color={COLOR.BLACK}
        name={LABEL.BUTTONS.SUBMIT}
        width={100}
        margin={"-10px -5px 0px auto"}
        postSubNovData={props.postSubNovData}
      />
      <IntroMsg>{MESSAGE.SELECT_COVER_INTRO}</IntroMsg>
      <ImgBox>
        <CoverImg 
          style={{
            backgroundImage: `url(${coverImgSrc})`,
            backgroundSize: "100% 100%"
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            props.setCoverImage({ file: e.target.files[0]});   // NovDetail 페이지의 redgitNovData에 이미지 데이터 세팅
            setPreviewImg(e.target.files[0]); 
          }}
        />
        <ImgDescription>{MESSAGE.BASIC_COVER_INTRO}</ImgDescription>
      </ImgBox>
    </Wrapper>
  );
};

export default SetNovCoverPopup;