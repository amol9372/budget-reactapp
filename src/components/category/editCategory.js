import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import CategoryBudgetService from "../../services/catgoryService";
import Card from "../UI/card";
import DialogBox from "../UI/dialogbox";
import InputField from "../UI/inputfield";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Label from "../UI/label";

const EditCatgory = (props) => {
  const [bcategory, setBCategory] = useState(props.category);
  const [startDate, setStartDate] = useState(new Date());

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

  const bCategorySubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    console.log("[BCatgory form submit]", bcategory);

    const res = await toast.promise(
      CategoryBudgetService.upsertCategory(bcategory),
      {
        pending: "Promise is pending",
        success: "Successfully edited Budget Category 👌",
        error: "Unable to edit Budget Category 🤯",
      }
    );

    if (res.status === 201) {
      props.updateCategoriesOnSuccess(res.data);
    } else {
      console.log("Error while editing Budget category ::: ", res.message);
    }
  };

  const deleteCategory = () => {
    //event.preventDefault();

    const response = trackPromise(
      CategoryBudgetService.deleteCategory(bcategory.id)
    );

    response.then((res) => {
      if (res.status === 200) {
        props.deleteCategoryOnSuccess(null);
      } else {
        console.log("Error while deleting Budget category ::: ", res.message);
      }
    });
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
        <div hidden={!bcategory.autoDeduct}>
          <Label color="white">{bcategory.autoDeductOn}</Label>
          {/* <DatePicker
            startDate={Date.now()}
            hidden={!bcategory.autoDeduct}
            selected={bcategory.autoDeductOn}
            onChange={(date) => setStartDate(date)}
          /> */}
        </div>

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
