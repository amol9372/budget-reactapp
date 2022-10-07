import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Card from "../UI/card";
import CardBox from "../UI/cardbox";
import Label from "../UI/label";
import { AddCircleOutlineSharp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const AllBudgets = (props) => {
  const history = useHistory();

  const [bg, setBg] = useState();

  const changeBackGround = () => {
    setBg("lightblue");
  };

  const revertBackGround = () => {
    setBg("#282828");
  };

  const budgetView = (budget) => {
    console.log("redirecting", budget);
    history.push({ pathname: "/budgetview", state: budget });
  };

  return (
    <CardBox width="40%">
      {props.budgets &&
        props.budgets.map((budget) => {
          return (
            <Card
              width="30%"
              handleMouseOver={changeBackGround}
              handleMouseOut={revertBackGround}
              handleClick={() => budgetView(budget)}
              bgcolor={bg}
              key={budget.id}
            >
              <Typography variant="h6">
                <Label color="white">{budget.name}</Label>
              </Typography>
            </Card>
          );
        })}
      <Card width="20%">
        <AddCircleOutlineSharp color="primary" fontSize="large" />
        {/* <Label color="white">{"Create New"}</Label> */}
      </Card>
    </CardBox>
  );
};

export default AllBudgets;
