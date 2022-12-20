import React from "react";

const Label = (props) => {
  return (
    <label
      style={{
        color: props.color,
        fontSize: props.font,
        background: props.background,
        borderRadius: props.borderradius,
        padding: props.padding,
        borderTopLeftRadius: "40%",
        borderTopRightRadius: "40%",
        borderBottomLeftRadius: "40%",
        borderBottomRightRadius: "40%",
        // borderEndEndRadius: "40%",
        // borderEndStartRadius: "40%",
        // padding: "6px",
        // margin: "3px",
      }}
    >
      {props.children}
    </label>
  );
};

export default Label;
