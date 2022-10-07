import React, { useState } from "react";
import classes from "../../components/UI/card.module.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: (props) => (props.flex ? props.flex : "auto"),
    display: (props) => (props.display ? props.display : "flex"),
    background: (props) => (props.bgcolor ? props.bgcolor : "#282828"),
    width: (props) => props.width,
    gap: (props) => (props.flexGap ? props.flexGap : "16px"),
    border: (props) => (props.border ? props.border : "0px solid"),
    flexDirection: (props) =>
      props.flexDirection ? props.flexDirection : "column",
    padding: (props) => (props.padding ? props.padding : "1.5%"),
    marginBottom: (props) => props.marginBottom,
    paddingBottom: (props) => props.paddingBottom,
    marginRight: (props) => props.marginRight,
    marginLeft: (props) => props.marginLeft,
    height: (props) => props.height,
    alignItems: (props) => (props.alignItems ? props.alignItems : "center"),
    textAlign: (props) => (props.textAlign ? props.textAlign : "center"),
    maxWidth: (props) => (props.maxWidth ? props.maxWidth : "45%"),
    marginTop: (props) => props.marginTop,
  },

  size: {},
});

const Card = (props) => {
  const cardStyle = useStyles(props);

  const handleMouseOver = (event) => {
    if (props.handleMouseOver) {
      props.handleMouseOver();
    }
  };

  const handleMouseOut = (event) => {
    if (props.handleMouseOver) {
      props.handleMouseOut();
    }
  };

  const handleClick = () => {
    console.log("[clicked]");
    if (props.handleClick) {
      props.handleClick();
    }
  };

  return (
    <div
      className={`${classes.card} ${cardStyle.root}`}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {props.children}
    </div>
  );
};

export default Card;
