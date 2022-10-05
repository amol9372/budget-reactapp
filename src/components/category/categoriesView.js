import { Button, IconButton, makeStyles } from "@material-ui/core";
import { CategoryRounded, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import CardBox from "../UI/cardbox";
import CategoryCard from "./categoryCard";
import EditCatgory from "./editCategory";
import { sampleBudgetCategories } from "./test-budgetCategory";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const CategoryView = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([
    {
      id: 0,
      name: "",
      allocated: 0.0,
      available: 0.0,
    },
  ]);

  useEffect(() => {
    setCategories(sampleBudgetCategories);
  }, [categories]);

  const [open, setOpen] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const updateCategory = (categoryNew) => {
    const categoriesClone = categories.map((item) => {
      const categoryClone = { ...item };
      return categoryClone;
    });

    categoriesClone.push(categoryNew);
    setCategories(categoriesClone);
    setDialogOpen(false);
  };

  return (
    <CardBox width="60%">
      {categories.map((item) => {
        return (
          <div style={{ width: "80%", display: "flex" }}>
            <CategoryCard
              key={item.id}
              id={item.id}
              name={item.name}
              allocated={item.allocated}
              available={item.available}
            />

            <IconButton size="medium" onClick={() => setDialogOpen(true)}>
              <Edit color="primary" />
              <EditCatgory
                open={dialogOpen}
                closeDialog={closeDialog}
                existingCategories={categories.map((cat) => cat.name)}
                updateCategoriesOnSuccess={updateCategory}
              />
            </IconButton>
          </div>
        );
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
    </CardBox>
  );
};

export default CategoryView;
