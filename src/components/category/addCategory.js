import {
  Checkbox,
  FormControl,
  FormControlLabel,
  makeStyles,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import CategoryBudgetService from "../../services/catgoryService";
import Card from "../UI/card";
import DialogBox from "../UI/dialogbox";
import InputField from "../UI/inputfield";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const attribute = {
  value: "",
  validation: "",
  error: false,
};

const useStyles = makeStyles((theme) => ({
  select: {
    width: "200px",
    color: "white",
    colorScheme: "white",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const AddCategory = (props) => {
  const [categoryMap, setCategoryMap] = useState(new Map());
  const classes = useStyles();
  const [bcategory, setBCategory] = useState();
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState({
    value: "",
    validation: "",
    error: false,
  });
  const [allocated, setAllocated] = useState({
    value: 0,
    validation: "",
    error: false,
  });
  const [autoDeduct, setAutoDeduct] = useState({
    value: false,
    validation: "",
    error: false,
  });

  const [autoDeductOn, setAutoDeductOn] = useState({
    value: new Date(),
    validation: "",
    error: false,
  });

  const [category, setCategory] = useState();
  const [hideAutoDeductDate, setHideAutoDeductDate] = useState(true);

  const handleClose = () => {
    setCategory("");
    setAutoDeductOn({
      value: new Date(),
      validation: "",
      error: false,
    });
    setAllocated({
      value: 0,
      validation: "",
      error: false,
    });
    setName({
      value: "",
      validation: "",
      error: false,
    });
    setHideAutoDeductDate(true);
    props.closeDialog();
  };

  const bcategoryNameChangeHandler = (event) => {
    const input = event.target.value;
    /* TO-DO  */

    if (categoryMap.size === 0) {
      props.existingCategories.forEach((cat) => {
        categoryMap.set(cat.subCategory, cat.categoryBudgets);
      });
    }

    if (categoryMap.has(category)) {
      const budgetCategories = categoryMap
        .get(category)
        .map((budgetCat) => budgetCat.name.toLowerCase());
      if (budgetCategories.includes(input.trim().toLowerCase())) {
        name.error = true;
        name.validation = "Category name already exists";
        name.value = input;
        setName((prevName) => ({
          ...prevName,
          error: true,
          validation: "Category name already exists",
          value: input,
        }));

        setErrors((prevErrors) => [
          ...prevErrors,
          { field: "Category Name", message: "Already exists" },
        ]);

        return;
      }
    }

    const errorClone = [];
    errors.forEach((error) => {
      if (error.field !== "Category Name") {
        errorClone.push(error);
      }
    });

    setErrors(errorClone);

    setName((prevName) => ({
      ...prevName,
      value: input,
      error: false,
      validation: "",
    }));
  };

  const bcategoryAllocationChangeHandler = (event) => {
    const input = event.target.value;

    setAllocated((prevAllocation) => ({
      ...prevAllocation,
      value: input,
      error: false,
      validation: "",
    }));
  };

  const handleAutoDetect = (event) => {
    setAutoDeduct((prev) => ({
      ...prev,
      value: !prev.value,
      error: false,
      validation: "",
    }));

    setHideAutoDeductDate((prev) => !prev);
  };

  const handleCategory = (event) => {
    const input = event.target.value;

    setCategory(input);
  };

  const bCategorySubmit = (event) => {
    event.preventDefault();
    if (errors.length > 0) {
      console.log(errors);
      return;
    }

    const body = {
      category: name.value,
      subCategory: category,
      allocated: allocated.value,
      userDefined: true,
      used: 0,
      autoDeduct: autoDeduct.value,
      autoDeductionOn: autoDeductOn.value,
    };

    console.log("[Add Category form submit]", body);
    const response = trackPromise(CategoryBudgetService.createCategory(body));

    response.then((res) => {
      if (res.status === 200 || res.status === 201) {
        // bcategory.id = res.data.id;
        props.updateCategoriesOnSuccess(res.data);
      }
    });
  };

  return (
    <DialogBox
      open={props.open}
      closeDialog={handleClose}
      title="Add Budget Category"
      saveCancelDialog={true}
      submit={bCategorySubmit}
    >
      <Card width="90%" padding="2.5%" maxWidth="90%">
        <InputField
          //size="medium"
          label="Name"
          type="text"
          value={name.value}
          onchange={bcategoryNameChangeHandler}
          error={name.error}
          validationText={name.validation}
          required={true}
        />
        <FormControl className={classes.formControl}>
          {/* <InputLabel htmlFor="age-native-simple">Category</InputLabel> */}
          <Select
            native
            className={classes.select}
            required={true}
            defaultValue="general"
            color="primary"
            onChange={handleCategory}
            inputProps={{
              name: "Category",
              id: "age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            {props.existingCategories &&
              props.existingCategories.map((cat) => {
                return (
                  <option value={cat.subCategory}>{cat.subCategory}</option>
                );
              })}
          </Select>
        </FormControl>
        <InputField
          //size="medium"
          label="Allocation"
          type="number"
          value={allocated.value}
          onchange={bcategoryAllocationChangeHandler}
          error={allocated.error}
          validationText={allocated.validation}
          required={true}
        />
        <FormControlLabel
          value="autoDeduct"
          control={
            <Checkbox
              color="primary"
              onChange={handleAutoDetect}
              //checked={autoDeduct.value}
            />
          }
          label="Auto Deduct"
          labelPlacement="start"
        />
        <div hidden={hideAutoDeductDate}>
          <DatePicker
            startDate={Date.now()}
            minDate={new Date()}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
            selected={autoDeductOn.value}
            onChange={(date) =>
              setAutoDeductOn((prev) => ({ ...prev, value: date }))
            }
          />
        </div>
        <FormControlLabel
          value="userDefined"
          control={
            <Checkbox
              color="primary"
              // onChange={handleAutoDetect}
              checked={true}
              readOnly={true}
            />
          }
          label="User Defined"
          labelPlacement="start"
        />
      </Card>
    </DialogBox>
  );
};

export default AddCategory;
