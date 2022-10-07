import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CategoryView from "../category/categoriesView";
import Card from "../UI/card";
import Label from "../UI/label";
import Budget from "./budget";
import { useHistory } from "react-router-dom";

const BudgetView = (props) => {
  const history = useHistory();
  const data = history.location.state;
  console.log(data);
  return (
    <>
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
          <Label color={"lightgreen"}>${data.current}</Label>
        </Typography>
        <Typography variant="subtitle1">
          <Label color={"lightblue"}>Original &nbsp;</Label>
          <Label color={"grey"}> ${data.moneyAssigned}</Label>
        </Typography>
      </Card>
      <CategoryView />
    </>
  );
};

export default BudgetView;
