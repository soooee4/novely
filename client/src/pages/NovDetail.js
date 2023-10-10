import { useState } from "react";

// Popup Component
import ModalPopup from "components/popup/ModalPopup";

import { Box } from "@mui/material";

import { CODE, LABEL, COLOR } from "common"; 
import ViewNovPopup from "components/popup/ViewNovPopup";
import WriteNovPopup from "components/popup/WriteNovPopup";

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
    <>
     <Box
        sx={{
          width: 100,
          height: 100,
          backgroundColor: COLOR.LIGHT_ORANGE
        }} 
      />
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

    </>
  )
}

export default NovDetail;