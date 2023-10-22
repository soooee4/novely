import {styled, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { LABEL, COLOR } from "common";

const Search = styled('div')({
  display:'flex',
  borderRadius: 10,
  backgroundColor: COLOR.LIGHT_GRAY,
  width: '80%',
  paddingRight: 15,
  margin: '0 auto'
});

const SearchIconWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: COLOR.INHERIT,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 2, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
  },
    flexGrow: 1,
}));

const SearchBar = (props) => {
  return (
    <Search>
      <StyledInputBase
        placeholder={LABEL.INPUT.SEARCH}
        inputProps={{ 'aria-label': 'search' }}
      />
      <SearchIconWrapper>
        <SearchIcon 
          onClick={props.onClick}
        />
      </SearchIconWrapper>
    </Search>
  )
}

export default SearchBar;