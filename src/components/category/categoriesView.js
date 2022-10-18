import { Button, Divider, makeStyles, Typography } from "@material-ui/core";
import { CategoryRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useHistory } from "react-router-dom";
import CategoryBudgetService from "../../services/catgoryService";
import CardBox from "../UI/cardbox";
import CategoryCard from "./categoryCard";
import AddCategory from "./addCategory";
import Label from "../UI/label";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  categoryType: {
    marginLeft: "7%",
    display: "flex",
    flex: "2 1 auto",
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
}));

const CategoryView = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [categories, setCategories] = useState([
    {
      id: 0,
      name: "",
      userDefined: false,
      allocated: 0.0,
      used: 0.0,
      budgetId: 0,
      autoDeduct: true,
      autoDeductOn: "",
    },
  ]);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    getBudgetCategories(props.budgetId);
    //setCategories(sampleBudgetCategories);
  }, []);

  const getBudgetCategories = (budgetId) => {
    const response = trackPromise(
      CategoryBudgetService.getCategories(budgetId)
    );

    response
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          if (res.data.length > 0) {
            setCategories(res.data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCategory = (categoryNew) => {
    history.go();
  };

  const addCategory = (bcategory) => {
    setDialogOpen(false);
    history.go();
  };

  const deleteCategory = () => {
    history.go();
  };

  return (
    <CardBox width="50%">
      {/* <Divider /> */}
      <div className={classes.categoryType}>
        <Typography variant="body2">
          <Label color="lightgrey">{"SYSTEM"}</Label>
        </Typography>
      </div>

      {categories.map((item) => {
        if (!item.userDefined) {
          return (
            <div style={{ width: "80%", display: "flex" }}>
              <CategoryCard
                item={item}
                key={item.id}
                id={item.id}
                updateCategory={updateCategory}
              />
            </div>
          );
        }
      })}

      <div className={classes.categoryType}>
        <Typography variant="body2">
          <Label color="lightgrey">{"USER DEFINED"}</Label>
        </Typography>
      </div>

      {categories.map((item) => {
        if (item.userDefined) {
          return (
            <div style={{ width: "80%", display: "flex" }}>
              <CategoryCard
                item={item}
                key={item.id}
                id={item.id}
                updateCategory={updateCategory}
              />
            </div>
          );
        }
      })}
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CategoryRounded />}
        onClick={() => setDialogOpen(true)}
      >
        Add Category
      </Button>

      <AddCategory
        // category={item}
        open={dialogOpen}
        closeDialog={closeDialog}
        existingCategories={categories.map((cat) => cat.name)}
        updateCategoriesOnSuccess={addCategory}
      />
    </CardBox>
  );
};

export default CategoryView;
