
// Control Component
import Buttons from "components/controls/Button";

// Constant
import { Box } from "@mui/material";
import { CODE, LABEL, COLOR } from "common";



const ViewNovPopup = (props) => {

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: COLOR.GREEN_TEA
        }} 
      />
      {/* <button 
        type="button"
        onClick={props.changeState}
      >
        이어쓰기
      </button> */}
      <Buttons 
        type={CODE.BUTTON.BASIC}
        backgroundColor={COLOR.WHITE}
        color={COLOR.BLACK}
        name={LABEL.BUTTONS.GOTOWRITE}
      ></Buttons>
    </>
  )
};

export default ViewNovPopup;
