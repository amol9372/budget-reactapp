import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import CategoryBudgetService from "../../services/catgoryService";
import Card from "../UI/card";
import DialogBox from "../UI/dialogbox";
import InputField from "../UI/inputfield";

const EditCatgory = (props) => {
  const [bcategory, setBCategory] = useState(props.category);

  const handleClose = () => {
    setBCategory(props.category);
    props.closeDialog();
  };

  const bcategoryAllocationChangeHandler = (event) => {
    const input = event.target.value;

    setBCategory((prevbCategory) => ({
      ...prevbCategory,
      allocated: input,
      error: false,
      validation: "",
    }));
  };

  const bCategorySubmit = (event) => {
    event.preventDefault();
    console.log(event);
    //validations()
    console.log("[BCatgory form submit]", bcategory);
    //bcategory.primary_user = true;

    const response = trackPromise(
      CategoryBudgetService.upsertCategory(bcategory)
    );

    response.then((res) => {
      if (res.status === 200) {
        bcategory.id = res.data.id;
        setBCategory(bcategory);
      } else {
        console.log("Error while editing Budget category ::: ", res);
      }
    });

    props.updateCategoriesOnSuccess(bcategory);
  };

  const deleteCategory = () => {
    //event.preventDefault();

    const response = trackPromise(
      CategoryBudgetService.deleteCategory(bcategory.id)
    );

    response.then((res) => {
      if (res.status === 200) {
      } else {
        console.log("Error while deleting Budget category ::: ", res);
      }
    });

    props.updateCategoriesOnSuccess(null);
  };

  return (
    <DialogBox
      open={props.open}
      closeDialog={handleClose}
      title="Edit Budget Category"
      saveCancelDialog={true}
      delete={bcategory.userDefined}
      submit={bCategorySubmit}
      onDelete={deleteCategory}
    >
      <Card width="90%" padding="2.5%" maxWidth="90%">
        <InputField
          label="Category Name"
          type="text"
          value={bcategory.name}
          // onchange={bcategoryNameChangeHandler}
          error={bcategory.error}
          // validationText={bcategory.validation}
          required={true}
          readOnly={true}
        />
        <InputField
          label="Allocation"
          type="number"
          value={bcategory.allocated}
          onchange={bcategoryAllocationChangeHandler}
          error={bcategory.error}
          validationText={bcategory.validation}
          required={true}
        />
        <FormControlLabel
          value="autoDeduct"
          control={
            <Checkbox
              color="primary"
              //onChange={handleAutoDetect}
              checked={bcategory.autoDeduct}
            />
          }
          label="Auto Deduct"
          labelPlacement="end"
          //disabled={true}
        />
        <FormControlLabel
          value="userDefined"
          control={
            <Checkbox
              color="primary"
              // onChange={handleAutoDetect}
              checked={bcategory.userDefined}
            />
          }
          label="User Defined"
          labelPlacement="end"
          // disabled={true}
        />
      </Card>
    </DialogBox>
  );
};

export default EditCatgory;
