// MUI Package Module
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

// Constant
import { LABEL } from "common";

const theme = createTheme({
	components: {
		MuiInput: {
			styleOverrides: {
				underline: {
					"&:after": {
						borderBottom: "none",
					},
				},
			},
		},
	},
});

const Inputs = (props) => {
	const test = props.defaultValue;

	return (
		<ThemeProvider theme={theme}>
			<TextField
				fullWidth={props.fullWidth}
				id={props.id}
				label={props.label}
				variant={LABEL.INPUT.STANDARD}
				helperText={props.helperText}
				defaultValue={test}
				onChange={props.onChange}
			/>
		</ThemeProvider>
	);
};

export default Inputs;
