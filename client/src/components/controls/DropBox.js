import { useEffect, useState } from "react";
import { useTheme, OutlinedInput, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import { COLOR, LABEL, MESSAGE } from 'common';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const getStyles = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}



const Dropbox = (props) => {
  const propsGenreList = [
    { label: '판타지', value: 'fantasy' },
    { label: '호러', value: 'horror' }
  ];

  // useEffect(() => {
    
  // }, []);

  

  const theme = useTheme();
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);

  const test = propsGenreList.map((item) => {
    return (item.value)
  });

  useEffect(() => {
    setGenre(test)
  }, [])

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedGenre(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{LABEL.SELECT.GENRE}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedGenre}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {genre.map((name, i) => (
            <MenuItem
              key={i}
              value={name}
              style={getStyles(name, selectedGenre, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropbox;