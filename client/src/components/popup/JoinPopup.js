import { Box } from "@mui/material";

import { COLOR } from "../../common/color"

const JoinPopup = (props) => {

  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 200,
          backgroundColor: COLOR.BLUE_GRAY
        }} 
      / >
        회원가입
      <button 
        type="button"
        onClick={props.changeState}
      >
        NEXT
      </button>
 
    </>
  )
};

export default JoinPopup;
