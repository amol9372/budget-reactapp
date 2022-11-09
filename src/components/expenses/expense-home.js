import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { Redirect } from "react-router-dom";
import HeaderBar from "../header/appBar";
import Expenses from "./expenses";
import NewExpense from "./new-expense";

const ExpenseHome = () => {
  const [authRequired, setAuthRequired] = useState(false);
  const [expenses, setExpenses] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      // check for expenses
      getBudgets();
    } else {
      setAuthRequired(true);
      console.log("[Redirecting to login page]");
    }
  }, []);

  const getBudgets = () => {
    // const response = trackPromise(BudgetService.fetchAllBudgets());
    // response
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       if (res.data.length > 0) {
    //         setBudgets(res.data);
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div>
      {authRequired && <Redirect to="/login" />}
      <>
        <HeaderBar />
        <NewExpense />
        <Expenses />
      </>
    </div>
  );
};

export default ExpenseHome;
