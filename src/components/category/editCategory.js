import React, { useState } from "react";
import Card from "../UI/card";
import DialogBox from "../UI/dialogbox";
import InputField from "../UI/inputfield";
// import CustomIconDropdown from "../dropdown/icondropdown";
import { Switch } from "@material-ui/core";
import Label from "../UI/label";
import { trackPromise } from "react-promise-tracker";
import CategoryService from "../../services/catgoryService";

const attribute = {
  id: NaN,
  name: "",
  allocated: NaN,
  error: false,
  default: false,
};

const EditCatgory = (props) => {
  const [bcategory, setBCategory] = useState(attribute);

  const handleClose = () => {
    setBCategory(attribute);
    props.closeDialog();
  };

  const bcategoryNameChangeHandler = (event) => {
    const input = event.target.value;

    if (
      props.existingBCategories &&
      props.existingBCategories.includes(input.trim())
    ) {
      bcategory.error = true;
      bcategory.validation = "Category name already exists";
      bcategory.name = input;
      setBCategory((prevbCategory) => ({
        ...prevbCategory,
        error: true,
        validation: "Category name already exists",
        name: input,
      }));
      return;
    }

    setBCategory((prevbCategory) => ({
      ...prevbCategory,
      name: input,
      error: false,
      validation: "",
    }));
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

  const bCategorySubmit = () => {
    console.log("[BCatgory form submit]", bcategory);
    //bcategory.primary_user = true;

    const requestBody = {
      //access_token: localStorage.getItem("access_token"),
      bcategory: bcategory,
    };

    const response = trackPromise(CategoryService.upsertCategory(requestBody));

    response.then((res) => {
      if (res.status === 401) {
        localStorage.clear();
        return;
      } else if (res.status === 200) {
        bcategory.id = res.data.id;
        setBCategory(bcategory);
      }
    });

    props.updateCategoriesOnSuccess(bcategory);
  };

  return (
    <DialogBox
      open={props.open}
      closeDialog={handleClose}
      title="Edit Budget Category"
      saveCancelDialog={true}
      submit={bCategorySubmit}
    >
      <Card width="90%" padding="2.5%" maxWidth="90%">
        <InputField
          //size="medium"
          label="Category Name"
          type="text"
          value={bcategory.name}
          onchange={bcategoryNameChangeHandler}
          error={bcategory.error}
          validationText={bcategory.validation}
          required={true}
        />
        <InputField
          //size="medium"
          label="Allocation"
          type="number"
          value={bcategory.allocated}
          onchange={bcategoryAllocationChangeHandler}
          error={bcategory.error}
          validationText={bcategory.validation}
          required={true}
        />
      </Card>
    </DialogBox>
  );
};

export default EditCatgory;
