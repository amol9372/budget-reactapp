import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { Redirect } from "react-router-dom";
import ExpenseService from "../../services/expenseService";
import HeaderBar from "../header/appBar";
import Expenses from "./expenses";
import NewExpense from "./new-expense";

const ExpenseHome = () => {
  const [authRequired, setAuthRequired] = useState(false);
  const [expenses, setExpenses] = useState([
    // {
    //   id: 0,
    //   name: "",
    //   cost: 0,
    //   category: "",
    //   date: "",
    // },
  ]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      // check for expenses
      getExpenses();
    } else {
      setAuthRequired(true);
      console.log("[Redirecting to login page]");
    }
  }, []);

  const getExpenses = () => {
    const response = trackPromise(ExpenseService.getExpenses());

    response
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          if (res.data.length > 0) {
            // setExpenses([]);
            setExpenses(() => res.data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createExpense = (expense) => {
    const response = trackPromise(ExpenseService.createExpense(expense));

    response
      .then((res) => {
        console.log(res);

        if (res.status === 200 || res.status === 201) {
          const expensesClone = [];

          expenses.map((item) => {
            expensesClone.push({ ...item });
          });

          expensesClone.push(expense);
          setExpenses(expensesClone);

          // getExpenses();
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
        <NewExpense createExpense={createExpense} />
        {expenses.length > 0 && <Expenses expenses={expenses} />}
      </>
    </div>
  );
};

export default ExpenseHome;
