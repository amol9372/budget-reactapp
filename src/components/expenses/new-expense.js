import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputField from "../UI/inputfield";
import {
  Button,
  FormControl,
  IconButton,
  Select,
  Typography,
} from "@material-ui/core";
import { Add, AddCircle } from "@material-ui/icons";
import CategoryBudgetService from "../../services/catgoryService";
import { trackPromise } from "react-promise-tracker";
import Label from "../UI/label";
import CreateExpenseCategory from "./createExpenseCategory";

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
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [categories, setCategories] = useState();
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

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition();
    getCategories();
  }, []);

  const getCategories = () => {
    const response = trackPromise(CategoryBudgetService.getBudgetCategories());

    response
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setCategories(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [category, setCategory] = useState();

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
    console.log(event);
    props.createExpense({
      name: name.value,
      cost: cost.value,
      category: category,
    });
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const createCategory = (item) => {
    var itemUpdated = {
      id: item.id,
      name: item.subCategory,
      subCategories: item.category,
    };

    const categoriesClone = categories.map((cat) => {
      const catClone = { ...cat };
      return catClone;
    });

    if (!item.existing) {
      categoriesClone.push(itemUpdated);
    } else {
      categoriesClone.forEach((element) => {
        if (element.name === item.subCategory) {
          element.subCategories.push(item.category);
        }
      });
    }

    setCategories(categoriesClone);
  };

  return (
    <>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={createExpense}
      >
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
              // defaultValue={}
              color="primary"
              onChange={handleCategory}
              inputProps={{
                name: "Category",
                id: "age-native-simple",
              }}
              value={category}
            >
              <optgroup key={1} label="Select">
                <option></option>
              </optgroup>
              {categories &&
                categories.map((cat) => {
                  return (
                    <optgroup key={cat.name} label={cat.name}>
                      {cat.subCategories.map((sub) => {
                        return (
                          <option
                            key={sub}
                            value={sub
                              .concat(":")
                              .concat(cat.name)
                              .concat(":")
                              .concat(cat.id)}
                          >
                            {sub}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })}
            </Select>
          </FormControl>
          <IconButton
            color="primary"
            onClick={() => setDialogOpen(true)}
            type="button"
          >
            <AddCircle style={{ marginRight: "4px" }} />
            <Typography variant="subtitle2">
              <Label color="rgb(112, 119, 199)">Add Category</Label>
            </Typography>
          </IconButton>
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
      <CreateExpenseCategory
        category={props.item}
        open={dialogOpen}
        closeDialog={closeDialog}
        existingCategories={categories}
        createCategory={(cat) => {
          createCategory(cat);
          setDialogOpen(false);
        }}
      />
    </>
  );
};

export default NewExpense;
