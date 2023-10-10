import { Box } from "@mui/material";

import { COLOR } from "../../common/color"

const ViewNovPopup = (props) => {

  return (
    <>
      <Box
        sx={{
          width: 100,
          height: 110,
          backgroundColor: COLOR.GREEN_TEA
        }} 
      / >
      <button 
        type="button"
        onClick={props.changeState}
      >
        이어쓰기
      </button>
 
    </>
  )
};

export default ViewNovPopup;
