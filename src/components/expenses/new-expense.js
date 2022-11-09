import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputField from "../UI/inputfield";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(4),
      width: 300,
    },
  },
  button: {},
}));

const NewExpense = () => {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off">
      <div>
        <InputField
          //size="medium"
          label="Name"
          type="text"
          // varient="standard"
          //   value={name.value}
          //   onchange={bcategoryNameChangeHandler}
          //   error={name.error}
          //   validationText={name.validation}
          required={true}
        />
        <InputField
          //size="medium"
          label="Name"
          type="text"
          // varient="standard"
          //   value={name.value}
          //   onchange={bcategoryNameChangeHandler}
          //   error={name.error}
          //   validationText={name.validation}
          required={true}
        />
      </div>
      <div>
        <InputField
          //size="medium"
          label="Name"
          type="text"
          // varient="standard"
          //   value={name.value}
          //   onchange={bcategoryNameChangeHandler}
          //   error={name.error}
          //   validationText={name.validation}
          required={true}
        />
        <InputField
          //size="medium"
          label="Name"
          type="text"
          // varient="standard"
          //   value={name.value}
          //   onchange={bcategoryNameChangeHandler}
          //   error={name.error}
          //   validationText={name.validation}
          required={true}
        />
      </div>
      <div>
        <InputField
          //size="medium"
          label="Name"
          type="text"
          // varient="standard"
          //   value={name.value}
          //   onchange={bcategoryNameChangeHandler}
          //   error={name.error}
          //   validationText={name.validation}
          required={true}
        />
        <InputField
          //size="medium"
          label="Name"
          type="text"
          // varient="standard"
          //   value={name.value}
          //   onchange={bcategoryNameChangeHandler}
          //   error={name.error}
          //   validationText={name.validation}
          required={true}
        />
      </div>
      <Button
        type="submit"
        // onClick={() => setDialogOpen(true)}
        variant="contained"
        color="inherit"
        className={classes.button}
        startIcon={<Add />}
      >
        Create new
      </Button>
    </form>
  );
};

export default NewExpense;
