import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Card from "../UI/card";
import Label from "../UI/label";

const Budget = () => {
  return (
    <Card
      width="15%"
      flexGap="6px"
      marginTop="4%"
      marginLeft="7%"
      padding="0.5%"
    >
      <Typography variant="h6">
        <Label color="white">Available Budget</Label>
      </Typography>
      <Typography variant="h4">
        <Label color={"lightgreen"}>${6000}</Label>
      </Typography>
      <Typography variant="subtitle1">
        <Label color={"lightblue"}>Original &nbsp;</Label>
        <Label color={"grey"}> ${6000}</Label>
      </Typography>
    </Card>
  );
};

export default Budget;
