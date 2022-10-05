import { Icon } from "@material-ui/core";

const CustomIcon = (props) => {
  return (
    <Icon
      style={{
        color: props.color,
        paddingTop: "auto",
        paddingBottom: "2px",
        marginBottom: "10%",
      }}
    >
      {props.children}
    </Icon>
  );
};

export default CustomIcon;
