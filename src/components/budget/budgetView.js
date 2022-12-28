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
import { isMobile } from "react-device-detect";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 6],
      backgroundColor: ["darkred", "blue", "rgba(255, 206, 86, 0.2)"],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

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

  const cardWidth = () => {
    if (isMobile) {
      return "40%";
    } else {
      return "15%";
    }
  };

  return (
    <>
      {authRequired && <Redirect to="/login" />}
      {budgetData && (
        <>
          <HeaderBar />
          <Card
            width={cardWidth()}
            flexGap="6px"
            marginTop="1%"
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
          {/* <div width="500px" height="500px">
            <Pie
              width="300px"
              height="300px"
              data={data}
              options={{ maintainAspectRatio: false }}
            />
          </div> */}
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
