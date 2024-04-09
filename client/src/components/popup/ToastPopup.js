// MUI Package Module
import { Stack, Snackbar, Alert } from "@mui/material";

// Redux Package Module
import { useSelector, useDispatch } from "react-redux";
import { setToastClose } from "redux/slice";

const ToastPopup = () => {

  const toast = useSelector((state) => state.main.toast)

  const dispatch = useDispatch();

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar
				open={toast.open}
				autoHideDuration={8500}
				onClose={() => dispatch(setToastClose())}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          marginTop: '200px',
        }}
			>
				<Alert
					severity={toast.type}
					sx={{ width: "100%" }}
				>
					{toast.message}
				</Alert>
			</Snackbar>
		</Stack>
	);
};

export default ToastPopup;