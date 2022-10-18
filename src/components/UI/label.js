import React from "react";

const Label = (props) => {
  return (
    <label
      style={{
        color: props.color,
        fontSize: props.font,
        background: (props) => props.background,

        // padding: "6px",
        // margin: "3px",
      }}
    >
      {props.children}
    </label>
  );
};

export default Label;
