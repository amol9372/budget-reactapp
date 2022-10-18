import { Typography } from "@material-ui/core";
import React from "react";
import Card from "../UI/card";
import Label from "../UI/label";

const Budget = (props) => {
  return (
    <Card
      width="15%"
      flexGap="6px"
      marginTop="4%"
      marginLeft="7%"
      padding="0.5%"
    >
      <Typography variant="h6">
        <Label color="white">{props.name}</Label>
      </Typography>
      <Typography variant="h4">
        <Label color={"lightgreen"}>${props.available}</Label>
      </Typography>
      <Typography variant="subtitle1">
        <Label color={"lightblue"}>Original &nbsp;</Label>
        <Label color={"grey"}> ${props.assigned}</Label>
      </Typography>
    </Card>
  );
};

export default Budget;
