import React from "react";
import classes from "../../components/UI/card.module.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    alignItems: (props) => (props.align ? props.align : "center"),
    marginTop: (props) => (props.marginTop ? props.marginTop : "5%"),
    flexDirection: (props) =>
      props.flexDirection ? props.flexDirection : "column",
    flex: (props) => props.flex,
    marginLeft: (props) => props.marginLeft,
    padding: (props) => (props.padding ? props.padding : "1.5%"),
    //maxWidth: (props) => (props.maxWidth ? props.maxWidth : "60%"),
    width: (props) => (props.width ? props.width : "60%"),
  },
});

const CardBox = (props) => {
  const cardboxStyle = useStyles(props);

  return (
    <div className={`${classes.cardbox} ${cardboxStyle.root}`}>
      {props.children}
    </div>
  );
};

export default CardBox;
