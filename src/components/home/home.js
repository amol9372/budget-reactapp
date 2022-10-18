import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { Redirect } from "react-router-dom";
import BudgetService from "../../services/budgetService";
import AllBudgets from "../budget/allbudgets";
import Budget from "../budget/budget";
import CategoryView from "../category/categoriesView";
import HeaderBar from "../header/appBar";
import Label from "../UI/label";

const Home = () => {
  const [authRequired, setAuthRequired] = useState(false);
  const [budgets, setBudgets] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      // check for budgets
      getBudgets();
    } else {
      setAuthRequired(true);
      console.log("[Redirecting to login page]");
    }
  }, []);

  const getBudgets = () => {
    const response = trackPromise(BudgetService.fetchAllBudgets());

    response
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          if (res.data.length > 0) {
            setBudgets(res.data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {authRequired && <Redirect to="/login" />}
      <>
        <HeaderBar />
        <AllBudgets budgets={budgets} />
      </>
    </div>
  );
};

export default Home;
