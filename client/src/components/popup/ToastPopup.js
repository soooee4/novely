// MUI Package Module
import { Stack, Snackbar, Alert } from "@mui/material";

// Constant
import { LABEL } from "common";

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

const ToastPopup = (props) => {
	const severity = _getAlertType(props.type);

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar
				open={props.open}
				autoHideDuration={2000}
				onClose={props.close}
			>
				<Alert
					onClose={props.close}
					severity={severity}
					sx={{ width: "100%" }}
				>
					{props.message}
				</Alert>
			</Snackbar>
		</Stack>
	);
};

export default ToastPopup;