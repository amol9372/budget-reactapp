import React, { useEffect, useState } from "react";
import CardBox from "../UI/cardbox";
import ExpenseCard from "./expense-card";
import { sampleExpenses } from "./test-expenses";

const Expenses = (props) => {
  const [expenses, setExpenses] = useState([
    {
      id: 0,
      name: "sample",
      category: "",
      cost: "",
      paidBy: "",
      datetime: "",
    },
  ]);

  useEffect(() => {
    setExpenses(sampleExpenses);
  }, [expenses]);

  return (
    <CardBox>
      {expenses.length > 0 &&
        expenses.map((expense) => {
          return (
            <ExpenseCard
              name={expense.name}
              key={expense.id}
              datetime={expense.datetime}
              cost={expense.cost}
            />
          );
        })}
    </CardBox>
  );
};

export default Expenses;
