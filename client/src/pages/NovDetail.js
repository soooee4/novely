import { useState } from "react";

// Popup Component
import ModalPopup from "components/popup/ModalPopup";

// Header Component
// import Header from "components/layout/Header";

// NovelInformation Component
import NovelInfo from "components/contents/NovelInfo";

import { Box } from "@mui/material";

import { CODE, LABEL, COLOR } from "common"; 
import ViewNovPopup from "components/popup/ViewNovPopup";
import WriteNovPopup from "components/popup/WriteNovPopup";
import styled from "@emotion/styled";

// 전체 영역
  const Wrapper =styled(Box)({
    width: '100vw',
    height: '100vh',
    border: '2px solid green',
  })




const NovDetail = () => {
  const [modal, setModal] = useState(false); 
  const [popup, setPopup] = useState('viewNov');

  const showModal = () => {
    setModal(true);
  };

  const popupChange = () => {
    if (popup === 'viewNov') {
      return <ViewNovPopup changeState={() => setPopup('writeNov')} />
    } else if (popup === 'writeNov') {
      return <WriteNovPopup />
    }
  }


  return (

    <Wrapper>
      {/* <Header
				showModal={showModal}
				changeState={() => setPopup("login")}
				logout={logout}
				isLogin={isLogin}
				// 함수를 만들지 않고 넘길 때 형태
				// openLogin={() => setLogin(true)}
				// openProfile={() => setProfile(true)}
			/> */}
      <NovelInfo />
      <button 
        type="button"
        // onClick={showModal}
        onClick={() => {
          showModal();
          setPopup('viewNov');
        }}
      >
        다음
      </button>

      <ModalPopup 
        open={modal}
        width={500}
        height={300}
        onClose={() => setModal(false)}
      >
     
        {popupChange()}
      </ModalPopup>
    </Wrapper>

  )
}

export default NovDetail;