import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CategoryView from "../category/categoriesView";
import Card from "../UI/card";
import Label from "../UI/label";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import BudgetService from "../../services/budgetService";
import HeaderBar from "../header/appBar";

const BudgetView = () => {
  const history = useHistory();
  const [authRequired, setAuthRequired] = useState(false);
  const [budgetData, setBudgetData] = useState();

  useEffect(() => {
    console.log("[State]", history.location.state);
    if (localStorage.getItem("user")) {
      if (
        history.location.state === null ||
        history.location.state === undefined
      ) {
        fetchBudget(JSON.parse(localStorage.getItem("currentBudget")).id);
      } else {
        fetchBudget(history.location.state.id);
        localStorage.setItem(
          "currentBudget",
          JSON.stringify(history.location.state)
        );
      }
    } else {
      setAuthRequired(true);
      console.log("[Redirecting to login page]");
    }
  }, []);

  const fetchBudget = (budgetId) => {
    const response = trackPromise(BudgetService.fetchBudgetDetails(budgetId));

    response
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setBudgetData(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reloadBudgetView = () => {
    // history.replace({ pathname: "/budgetview", state: budgetData });
  };

  const budgetColor = () => {
    console.log("[Current Budget] ::: ", budgetData.current);
    if (budgetData.current < 0) {
      setBudgetData((prevBudget) => ({
        ...prevBudget,
        current: -budgetData.current,
      }));

      return "red";
    }
    return "lightgreen";
  };

  const currentBudget = () => {
    var color, current;

    if (budgetData.current < 0) {
      current = -budgetData.current;
      color = "red";
    } else {
      current = budgetData.current;
      color = "lightgreen";
    }

    return (
      <Typography variant="h4">
        <Label color={color}>${current}</Label>
      </Typography>
    );
  };

  return (
    <>
      {authRequired && <Redirect to="/login" />}
      {budgetData && (
        <>
          <HeaderBar />
          <Card
            width="15%"
            flexGap="6px"
            marginTop="4%"
            marginLeft="7%"
            padding="0.5%"
          >
            <Typography variant="h6">
              <Label color="white">{budgetData.name}</Label>
            </Typography>
            {currentBudget()}
            <Typography variant="subtitle1">
              <Label color={"lightblue"}>Original &nbsp;</Label>
              <Label color={"grey"}> ${budgetData.moneyAssigned}</Label>
            </Typography>
          </Card>
          <CategoryView
            budgetId={budgetData.id}
            budget={budgetData}
            reload={reloadBudgetView}
          />
        </>
      )}
    </>
  );
};

export default BudgetView;
