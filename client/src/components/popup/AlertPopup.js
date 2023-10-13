import { Stack } from "@mui/material";

import { LABEL } from "common";

// const Alert = React.forwardRef(function Alert(props, ref) {
// 	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const _getAlertType = (type) => {
	let severity;
	switch (type) {
		case LABEL.ALERT.ERROR:
			severity = "error";
			break;
		case LABEL.ALERT.SUCCESS:
			severity = "success";
			break;
	}
	return severity;
};

// 네네
// 여긴 어차피 그렇게 중요한거 아니라 제가 좀 다 완성을 할게요
// 나중에 코드보고 연습해보시길 바랍니다 오ㅓㅏㅆ읍니다 

const ToastPopup = (props) => {
	const severity = _getAlertType(props.type);

	<Stack spacing={2} sx={{ width: "100%" }}>
		<Snackbar open={props.open} autoHideDuration={3000} onClose={!props.open}>
			<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
				{props.message}
			</Alert>
		</Snackbar>
	</Stack>;
};

export default ToastPopup;
