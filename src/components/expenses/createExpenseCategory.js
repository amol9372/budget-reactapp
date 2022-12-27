import { FormControl, makeStyles, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { trackPromise } from "react-promise-tracker";
import CategoryBudgetService from "../../services/catgoryService";
import Card from "../UI/card";
import DialogBox from "../UI/dialogbox";
import InputField from "../UI/inputfield";

// const attribute = {
//   value: "",
//   validation: "",
//   error: false,
// };

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

const CreateExpenseCategory = (props) => {
  const classes = useStyles();
  // const [categories, setCategories] = useState();
  // const [eCategory, setECategory] = useState();
  const [errors, setErrors] = useState([]);
  const [isExistingSubCategory, setIsExistingSubCategory] = useState(false);

  const [name, setName] = useState({
    value: "",
    validation: "",
    error: false,
  });

  const [subCategory, setSubCategory] = useState({
    value: "",
    validation: "",
    error: false,
  });

  const [newSubCategory, setNewSubCategory] = useState({
    value: "",
    validation: "",
    error: false,
  });

  // const [category, setCategory] = useState();

  const handleClose = () => {
    // setECategory(attribute);
    props.closeDialog();
  };

  const categoryNameChangeHandler = (event) => {
    const input = event.target.value;

    var categories = props.existingCategories.filter(
      (cat) => cat.name === subCategory.value
    );

    if (categories.length > 0) {
      categories = categories[0].subCategories.map((item) =>
        item.toLowerCase()
      );

      if (categories && categories.includes(input.trim().toLowerCase())) {
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

  const subCategoryChangeHandler = (event) => {
    const input = event.target.value;

    if (input === "newSubCategory") {
      setIsExistingSubCategory(false);
    } else {
      setIsExistingSubCategory(true);
    }

    setSubCategory((prev) => ({
      ...prev,
      value: input,
      error: false,
      validation: "",
    }));
  };

  const newSubcategoryChangeHandler = (event) => {
    const input = event.target.value;

    setNewSubCategory((prev) => ({
      ...prev,
      value: input,
      error: false,
      validation: "",
    }));
  };

  const eCategorySubmit = (event) => {
    event.preventDefault();
    if (errors.length > 0) {
      console.log(errors);
      return;
    }

    const body = {
      category: name.value,
      subCategory: newSubCategory.value
        ? newSubCategory.value
        : subCategory.value,
      existing: subCategory.value === "newSubCategory" ? false : true,
      allocated: 0.0,
      autoDeduct: false,
      userDefined: true,
    };

    console.log("[Add Expense Category form submit]", body);
    const response = trackPromise(
      CategoryBudgetService.createExpenseCategory(body)
    );

    response.then((res) => {
      if (res.status === 201) {
        // setCategory();
        props.createCategory({
          id: res.data.id,
          category: body.category,
          subCategory: body.subCategory,
          existing: body.existing,
        });
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    const response = trackPromise(CategoryBudgetService.getBudgetCategories());

    response
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          // setCategories(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DialogBox
      open={props.open}
      closeDialog={handleClose}
      title="Create Expense Category"
      saveCancelDialog={true}
      submit={eCategorySubmit}
    >
      <Card width="90%" padding="2.5%" maxWidth="90%">
        <InputField
          label="CategoryName"
          type="text"
          value={name.value}
          onchange={categoryNameChangeHandler}
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
            defaultValue="newSubCategory"
            color="primary"
            onChange={subCategoryChangeHandler}
            inputProps={{
              name: "Sub Category group",
              id: "age-native-simple",
            }}
            value={subCategory.value}
          >
            <option value={"newSubCategory"}>New Sub Category</option>
            {props.existingCategories &&
              props.existingCategories.map((cat) => {
                return (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
          </Select>
        </FormControl>
        <InputField
          hidden={isExistingSubCategory}
          label="New Sub Category Name"
          type="text"
          value={newSubCategory.value}
          onchange={newSubcategoryChangeHandler}
          error={newSubCategory.error}
          validationText={newSubCategory.validation}
          required={!isExistingSubCategory}
        />
      </Card>
    </DialogBox>
  );
};

export default CreateExpenseCategory;
