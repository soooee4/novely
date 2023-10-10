import { Box } from "@mui/material";

import { COLOR } from "../../common/color"

const WriteNovPopup = (props) => {

  return (
    <>
      <Box
        sx={{
          width: 100,
          height: 110,
          backgroundColor: COLOR.LIME
        }} 
      / >
      <button 
        type="button"
        onClick={props.changeState}
      >
        소설 작성 완료,, 다음
      </button>
 
    </>
  )
};

export default WriteNovPopup;
