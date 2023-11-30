// MUI Package Module
import { styled, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Constant
import { LABEL, COLOR } from "common";

const Search = styled("div")({
	display: "flex",
	borderRadius: 10,
	backgroundColor: COLOR.LIGHT_GRAY,
	width: "98%",
	paddingRight: 15,
	margin: "0 auto",
});

const SearchIconWrapper = styled("div")({
	display: "flex",
	alignItems: "center",
	cursor: "pointer",
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: COLOR.INHERIT,
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 2, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(1)})`,
	},
	flexGrow: 1,
}));

// 메인에 쓰인 검색창 Component
const SearchBar = (props) => {
	
	// 검색어 입력 후 Enter키 눌렀을 경우
	const enter = (e) => {
		if (e.key === "Enter") {
			props.onClick();
		}
	};

	return (
		<Search>
			<StyledInputBase
				placeholder={LABEL.INPUT.SEARCH}
				inputProps={{ "aria-label": "search" }}
				onChange={(e) => props.setSchWord(e.target.value.toLowerCase())}
				onKeyDown={enter}
			/>
			<SearchIconWrapper>
				<SearchIcon onClick={props.onClick} />
			</SearchIconWrapper>
		</Search>
	);
};

export default SearchBar;