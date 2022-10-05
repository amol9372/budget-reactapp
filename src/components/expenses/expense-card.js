import React from "react";
import Card from "../UI/card";
import Label from "../UI/label";

const ExpenseCard = (props) => {
  return (
    <Card padding="1.5%" flexDirection="row">
      <Label color="white">{props.name}</Label>
      <Label color="red">{props.category}</Label>
      <Label color="green">{props.cost}</Label>
      <Label color="purple">{props.paidBy}</Label>
      <Label color="white">{props.datetime}</Label>
      <Label color="red">{props.paidBy}</Label>
    </Card>
  );
};

export default ExpenseCard;
