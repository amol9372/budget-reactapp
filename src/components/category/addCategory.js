import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import CategoryBudgetService from "../../services/catgoryService";
import Card from "../UI/card";
import DialogBox from "../UI/dialogbox";
import InputField from "../UI/inputfield";

const attribute = {
  value: "",
  validation: "",
  error: false,
};

const AddCategory = (props) => {
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

  const handleClose = () => {
    setBCategory(attribute);
    props.closeDialog();
  };

  const bcategoryNameChangeHandler = (event) => {
    const input = event.target.value;

    var existingCategoriesLowerCase = props.existingCategories.map((item) =>
      item.toLowerCase()
    );
    if (
      existingCategoriesLowerCase &&
      existingCategoriesLowerCase.includes(input.trim().toLowerCase())
    ) {
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

    // if (input < 0) {
    //   setErrors((prevErrors) => [
    //     ...prevErrors,
    //     { field: "Allocated", message: "Cannot be negative" },
    //   ]);

    //   return;
    // }

    setAllocated((prevAllocation) => ({
      ...prevAllocation,
      value: input,
      error: false,
      validation: "",
    }));
  };

  const handleAutoDetect = (event) => {
    const input = event.target.value;

    setAutoDeduct((prevbCategory) => ({
      ...prevbCategory,
      autoDeduct: !prevbCategory.autoDeduct,
      error: false,
      validation: "",
    }));
  };

  const bCategorySubmit = (event) => {
    event.preventDefault();
    if (errors.length > 0) {
      console.log(errors);
      return;
    }

    const body = {
      category: name.value,
      allocated: allocated.value,
      userDefined: true,
      used: 0,
      autoDeduct: autoDeduct.value,
    };

    console.log("[Add Category form submit]", body);
    const response = trackPromise(CategoryBudgetService.createCategory(body));

    response.then((res) => {
      if (res.status === 200 || res.status === 201) {
        // bcategory.id = res.data.id;
        setBCategory(body);
      }
    });

    props.updateCategoriesOnSuccess(bcategory);
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
          label="Category Name"
          type="text"
          value={name.value}
          onchange={bcategoryNameChangeHandler}
          error={name.error}
          validationText={name.validation}
          required={true}
        />
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
