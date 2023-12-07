// MUI Package Module
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

// Constant
import { LABEL } from "common";

const createDynamicTheme = (color) => {
  return createTheme({
    components: {
      MuiInput: {
        styleOverrides: {
          underline: {
            "&:after": {
              borderBottom: "none",
            },
            ":hover": {
              borderBottom: color === "#121212" && "solid white 0.5px"
            }
          },
          input: {
            color: color === "#121212" ? 'white' : 'black',
            borderBottom: color === "#121212" && 'solid white 1px'
          }
        },
      },
    },
  })
};

// Input Component
const Inputs = (props) => {
  const { fullWidth, id, label, helperText, defaultValue, onChange, color } = props;

  // 상위에서 받아온 배경 컬러값에 따라 input창의 글씨색 변경
  const dynamicTheme = createDynamicTheme(color);

	return (
		<ThemeProvider theme={dynamicTheme}>
			<TextField
				fullWidth={fullWidth}
				id={id}
				label={label}
				variant={LABEL.INPUT.STANDARD}
				helperText={helperText}
				defaultValue={defaultValue}
				onChange={onChange}
			/>
		</ThemeProvider>
	);
};

export default Inputs;