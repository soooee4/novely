import { useEffect, useState } from "react";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { Box, styled, Typography } from "@mui/material";
import { CODE, LABEL, COLOR } from "common";
import Inputs from "components/controls/Input"

// 레이아웃
// 전체 영역
const Wrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: '0 3%',
  boxSizing: 'border-box',
  // border:'3px solid blue',
  marinTop: "-30px"
});

const WholeBox = styled(Box)({
  // border: "2px solid yellow",
  width: '100%',
  height: '100%',
  display: "flex",
  gap: 20,
  marginTop: 20,
  boxSizing: 'border-box',
});

const ViewBox = styled(Box)({
  // border: "2px solid grey",
  flex: 1,
  height: '100%',
  border: `1px solid ${COLOR.GRAY}`,
  borderRadius: 10,
  padding: 10,
  boxSizing: 'border-box',

});

const WriteBox = styled(Box)({
  // border: "2px solid orange",
  flex: 1,
  height: '100%',
  boxSizing: 'border-box',
})

// 제목, 이어쓰기 버튼 영역
const HeaderBox = styled(Box)({
  width: "100%",
  display: "flex",
  boxSizing: 'border-box',
  // border:'3px solid pink',
});

const Content = styled(Typography)({
  fontSize: 17,
});

const writeNovText = {
  width: "100%",
  height: "100%",
  boxSizing: "borderBox",
  resize: "none",
  outline:"none",
  borderRadius: 10,
  padding: 10,
  fontSize: 17,
  boxSizing: 'border-box',

};

const WriteNovPopup = (props) => {

//   postData("novel/postSubNovel", {
//     sub_title: ,
//     sub_content: ,
//     main_novel_seqno: props.mainNovel.main_seqno,
//     created_user: ,
//     genre_1: ,
//     genre_2: ,
//     keyword_1: ,
//     keyword_2: ,
//     keyword_3: ,
//     sub_description: 
//   })
//     .then((data) => {
//      console.log('post 완료')
//         // window.location.reload();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };



  return (
    <Wrapper>
      <HeaderBox>
        <Inputs
          fullWidth
          // ! 왜 안나오지
          defaultValue={props.mainNovel.title}
          // defaultValue="앵옹"

        />
        <Buttons 
          type={CODE.BUTTON.BASIC}
          backgroundColor={COLOR.WHITE}
          color={COLOR.BLACK}
          name={LABEL.BUTTONS.GOTONEXT}
          width={100}
          margin={"0px 0px 0px auto"}
          // changeState={props.changeState()}
        /> 
      </HeaderBox>
      <WholeBox>
        <ViewBox>
          <Content>
           {props.mainNovel.content}
          </Content>
        </ViewBox>
        <WriteBox>
          <textarea 
            style={writeNovText}
          />
        </WriteBox>
      </WholeBox>

      {/* 추후 top 기능 구현하기 */}
      {/* <Buttons
        sx={{
          cursor: "pointer",
        }}
        type={CODE.BUTTON.BASIC}
        name={LABEL.BUTTONS.TOP}
        // onClick={scrollToTop}
        margin={"0px 0px 0px 83%"}
      /> */}

  </Wrapper>

  )
};

export default WriteNovPopup;
