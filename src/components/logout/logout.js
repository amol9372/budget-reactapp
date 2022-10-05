import { Avatar, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import React from "react";
import Card from "../UI/card";
import LogoutLogo from "../UI/logout.svg";

const useStyles = makeStyles({
  addIconStyle: {
    display: "flex",
    gap: "4px",
    borderRadius: "4px",
    margin: "3%",
    color: "grey",
    fontSize: "18px",
    // "&:hover": {
    //   border: ".5px solid grey",
    //   backgroundColor: "rgba(52, 52, 52, 0.8)",
    // },
  },
});

const Logout = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const addSectionStyle = useStyles();

  return (
    <Card
      gap="7px"
      flexDirection="row"
      height="35px"
      padding="2%"
      width="130px"
    >
      <Tooltip title="Logout">
        <IconButton
          size="small"
          className={addSectionStyle.addIconStyle}
          onClick={() => props.onLogout()}
        >
          <img
            src={LogoutLogo}
            alt="react logo"
            height="25px"
            width="35px"
            style={{ marginRight: "4px" }}
          />
        </IconButton>
      </Tooltip>
      <Avatar
        src="https://lh3.googleusercontent.com/a-/AOh14GjaJaIAbIXq_ODs-c0T869VamUVFZ83jBY5o5OXIg=s96-c"
        style={{ width: 30, height: 30 }}
      />
    </Card>
  );
};

export default Logout;
