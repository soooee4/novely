import { useEffect, useState } from "react";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { Box, styled, Typography } from "@mui/material";
import { CODE, LABEL, COLOR } from "common";

import { getData } from "common/communication";

// 레이아웃
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
	// border:'3px solid blue',
	marinTop: "-30px",
});




const WriteNovIntroPopup = (props) => {


	return (
		<Wrapper>
		
		</Wrapper>
	);
};

export default WriteNovIntroPopup;
