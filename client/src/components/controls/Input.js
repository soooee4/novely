import TextField from '@mui/material/TextField';

import { LABEL } from 'common'; 


const Inputs = (props) => {
  const test = props.defaultValue;
  console.log(typeof props.defaultValue);

  return (
    <TextField
      fullWidth={props.fullWidth}
      id={props.id}
      label={props.label} 
      variant= {LABEL.INPUT.STANDARD}
      helperText={props.helperText}
      // defaultValue={props.defaultValue}
      defaultValue={test}

      // inputProps={props.InputProps}
    />
  );
}

export default Inputs;