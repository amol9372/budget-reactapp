import React, { useState } from "react";
import Card from "../UI/card";
import DialogBox from "../UI/dialogbox";
import InputField from "../UI/inputfield";
import { trackPromise } from "react-promise-tracker";
import CategoryBudgetService from "../../services/catgoryService";
import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import BudgetService from "../../services/budgetService";

const attribute = {
  id: NaN,
  name: "",
  moneyAssigned: 0,
  moneyAvailable: 0,
  cycle: "endofmonth", // endofmonth
  autoDeduct: true,
  error: false,
  default: false,
};

const CreateEditBudget = (props) => {
  const [budget, setBudget] = useState(attribute);

  const handleClose = () => {
    setBudget(attribute);
    props.closeDialog();
  };

  const nameChangeHandler = (event) => {
    const input = event.target.value;

    if (props.existingBudgets && props.existingBudgets.includes(input.trim())) {
      budget.error = true;
      budget.validation = "Budget name already exists";
      budget.name = input;
      setBudget((prevbudget) => ({
        ...prevbudget,
        error: true,
        validation: "Budget name already exists",
        name: input,
      }));
      return;
    }

    setBudget((prevbudget) => ({
      ...prevbudget,
      name: input,
      error: false,
      validation: "",
    }));
  };

  const allocationChangeHandler = (event) => {
    const input = event.target.value;

    setBudget((prevBudget) => ({
      ...prevBudget,
      moneyAssigned: input,
      error: false,
      validation: "",
    }));
  };

  const handleCycleChange = (event) => {
    setBudget((prevBudget) => ({
      ...prevBudget,
      cycle: event.target.value,
    }));
    //console.log(event.target.value);
  };

  const budgetSubmit = () => {
    budget.moneyAvailable = budget.moneyAssigned;
    console.log("[Budget form submit]", budget);
    const response = trackPromise(BudgetService.createBudget(budget));

    response.then((res) => {
      if (res.status === 200) {
        // budget.id = res.data.id;
        setBudget(budget);
      }
    });
    props.updateBudgetOnSuccess(budget);
  };

  return (
    <DialogBox
      open={props.open}
      closeDialog={handleClose}
      title="Create Budget"
      saveCancelDialog={true}
      submit={budgetSubmit}
    >
      <Card width="90%" padding="2.5%" maxWidth="90%">
        <InputField
          //size="medium"
          label="Budget Name"
          type="text"
          value={budget.name}
          onchange={nameChangeHandler}
          error={budget.error}
          validationText={budget.validation}
          required={true}
        />
        <InputField
          //size="medium"
          label="Allocation"
          type="number"
          value={budget.moneyAssigned}
          onchange={allocationChangeHandler}
          error={budget.error}
          validationText={budget.validation}
          required={true}
        />
        <RadioGroup
          row
          aria-label="position"
          name="position"
          //defaultValue={budget.cycle}
          onChange={handleCycleChange}
        >
          <FormControlLabel
            value="endofmonth"
            control={<Radio color="primary" />}
            label="End of Month"
            labelPlacement="start"
          />
          <FormControlLabel
            value="prorate"
            control={<Radio color="primary" />}
            label="Pro Rate"
            labelPlacement="start"
          />
        </RadioGroup>
      </Card>
    </DialogBox>
  );
};

export default CreateEditBudget;
