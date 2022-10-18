import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const small = "20%";
const medium = "50%";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#1f1f1f",
    borderRadius: "8px",
    border: "1px white",
    background: "#1f1f1f",
    "& .MuiOutlinedInput-input": {
      padding: "10.5px 14px",
    },
  },

  inputProps: {
    color: "hsla(0,0%,100%,.77)",
    background: "#1f1f1f",
    height: 40,
  },
  readOnly: (props) => {
    return props.readOnly ? props.readOnly : false;
  },

  size: {
    width: (props) => {
      if (props.size === "small") {
        return small;
      } else if (props.size === "medium") {
        return medium;
      }
    },
  },
});

const InputField = (props) => {
  const inputFieldStyle = useStyles(props);

  return (
    <TextField
      // id={props.label}
      required={props.required}
      error={props.error}
      helperText={props.validationText}
      value={props.value}
      placeholder={props.label}
      onChange={(e) => props.onchange(e)}
      variant="outlined"
      fullWidth
      type={props.type}
      className={`${inputFieldStyle.root} ${inputFieldStyle.size}`}
      InputProps={{
        className: inputFieldStyle.inputProps,
        readOnly: props.readOnly,
        inputProps: { min: 0 },
      }}
      disabled={props.disabled ? props.disabled : false}
    />
  );
};

export default InputField;
