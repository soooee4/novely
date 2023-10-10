import { Box } from "@mui/material";

import { COLOR } from "../../common/color"

const LoginPopup = (props) => {

  return (
    <>
      <Box
        sx={{
          width: 100,
          height: 100,
          backgroundColor: COLOR.LIGHT_BROWN
        }} 
      / >
      <button 
        type="button"
        onClick={props.changeState}
      >
        회원가입
      </button>
    </>
  )
};

export default LoginPopup;
