import TextField from '@mui/material/TextField';

import { LABEL } from 'common'; 


const Inputs = (props) => {
  return (
      <TextField 
        id={props.id}
        label={props.label} 
        variant= {LABEL.INPUT.STANDARD}
        helperText={props.helperText}
        defaultValue={props.defaultValue}
        inputProps={props.InputProps}
        />
  );
}

export default Inputs;