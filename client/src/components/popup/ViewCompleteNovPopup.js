// React Package Module
import { useEffect, useState } from "react";

// Constant
import { Box, styled, Typography } from "@mui/material";

// API
import { getData } from "common/communication";
import { useSelector } from "react-redux";

/** STYLE 정의 */
// 레이아웃
const Wrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "0 3%",
  boxSizing: "border-box",
});

const Title = styled(Typography)({
  marginBottom: 15,
  fontSize: 18,
  fontWeight: "bold",
});

const Content = styled(Typography)({
  fontSize: 17,
  whiteSpace: "pre-wrap",
});

// 내용 표시되는 영역
const ContentBox = styled(Box)({
  overflow: "auto",
  paddingRight: 12,
  
  "&::-webkit-scrollbar": {
    width: 5,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#aaa",
    borderRadius: 5,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
});

/** 완성 작품 읽기 컴포넌트 (작품 상세 페이지에서 view 버튼 클릭 시 완성작일 경우 해당 팝업 띄워줌) */
const ViewCompleteNovPopup = () => {
  // redux store state
  const complete_seqno = useSelector(
    (state) => state.main.clickNovel.complete_seqno
  );

  const [completeNovel, setCompleteNovel] = useState({}); // 완성 소설 데이터

  // 완성 소설 보기
  useEffect(() => {
    // 삭제
    // getData("novel/getCompleteNovel", { complete_seqno: props.complete_seqno })
    getData("novel/getCompleteNovel", { complete_seqno: complete_seqno })
      .then(function (data) {
        setCompleteNovel(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <Title>{completeNovel[0] && completeNovel[0].complete_novel_title}</Title>
      <ContentBox>
        <Content>
          {
            completeNovel[0] &&
              completeNovel[0]// .complete_novel_content
              .complete_novel_content
                .replaceAll(/(?:\r|\n\|r\n|\\n|\\r|\\n\\n|\\r\\n)/g, "\r\n")
                .replaceAll("\\", "")
          }
        </Content>
      </ContentBox>
    </Wrapper>
  );
};

export default ViewCompleteNovPopup;
