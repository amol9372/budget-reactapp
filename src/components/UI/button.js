import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const small = "20%";
const medium = "50%";

const useStyles = makeStyles({
  root: {
    backgroundColor: (props) => props.backgroundColor,
    "&:hover": {
      backgroundColor: (props) => props.backgroundColor,
    },
    color: "#fff",
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },

  size: {
    width: (props) => {
      if (props.size === "small") {
        return small;
      } else if (props.size === "medium") {
        return medium;
      }
    },
    height: (props) => (props.height ? props.height : "30px"),
  },
});

const MyButton = (props) => {
  const buttonStyle = useStyles(props);

  return (
    <Button
      className={`${buttonStyle.root} ${buttonStyle.size}`}
      variant={props.varint ? props.varient : "contained"}
      style={{ textTransform: "none" }}
      onClick={props.onClick}
      type={props.type}
    >
      <span style={{ fontSize: props.textSize }} color={props.color}>
        {props.text}
      </span>
    </Button>
  );
};

export default MyButton;
