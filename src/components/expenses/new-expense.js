import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputField from "../UI/inputfield";
import { Button, FormControl, Select } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: 300,
    },
    marginTop: "3%",
    marginBottom: "3%",
  },
  button: { margin: "17px" },
  select: {
    margin: "15px",
    width: "200px",
    color: "white",
    height: "40px",
    colorScheme: "white",
  },
  div: {},
}));

const NewExpense = (props) => {
  const classes = useStyles();
  const [name, setName] = useState({
    value: "",
    validation: "",
    error: false,
  });
  const [cost, setCost] = useState({
    value: 0,
    validation: "",
    error: false,
  });

  const [category, setCategory] = useState("general");

  const handleCategory = (event) => {
    const input = event.target.value;

    setCategory(input);
  };

  const handleName = (event) => {
    const input = event.target.value;

    setName((prevName) => ({
      ...prevName,
      value: input,
      error: false,
      validation: "",
    }));
  };

  const handleCost = (event) => {
    const input = event.target.value;

    setCost((prevCost) => ({
      ...prevCost,
      value: input,
      error: false,
      validation: "",
    }));
  };

  const createExpense = (event) => {
    event.preventDefault();
    props.createExpense({
      name: name.value,
      cost: cost.value,
      category: category,
    });
  };

  return (
    <form className={classes.root} autoComplete="off" onSubmit={createExpense}>
      <div>
        <InputField
          //size="medium"
          label="Name"
          type="text"
          // varient="standard"
          value={name.value}
          onchange={handleName}
          //   error={name.error}
          //   validationText={name.validation}
          required={true}
        />
        <FormControl className={classes.formControl}>
          {/* <InputLabel htmlFor="age-native-simple">Category</InputLabel> */}
          <Select
            variant="outlined"
            native
            className={classes.select}
            required={true}
            defaultValue={category}
            color="primary"
            onChange={handleCategory}
            inputProps={{
              name: "Category",
              id: "age-native-simple",
            }}
          >
            {/* <option aria-label="None" value="Select" /> */}
            <option value={"general"}>General</option>
            <option value={"groceries"}>Groceries</option>
            <option value={"electronics"}>Electronics</option>
            <option value={"sports"}>Sports</option>
            <option value={"clothing"}>Clothing</option>
          </Select>
        </FormControl>
      </div>
      <div className={classes.div}>
        <InputField
          //size="medium"
          label="Cost"
          type="number"
          // varient="standard"
          value={cost.value}
          onchange={handleCost}
          //   error={name.error}
          //   validationText={name.validation}
          required={true}
        />
        <Button
          type="submit"
          variant="contained"
          color="inherit"
          className={classes.button}
          startIcon={<Add />}
        >
          Create new
        </Button>
      </div>
    </form>
  );
};

export default NewExpense;
