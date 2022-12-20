import { Button, makeStyles, Typography } from "@material-ui/core";
import { CategoryRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useHistory } from "react-router-dom";
import CategoryBudgetService from "../../services/catgoryService";
import CardBox from "../UI/cardbox";
import Label from "../UI/label";
import AddCategory from "./addCategory";
import CategoryCard from "./categoryCard";
import { isMobile } from "react-device-detect";

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
    console.log("[Updated Category]", categoryNew);

    const categoriesClone = categories.map((cat) => {
      var catClone;
      if (cat.id === categoryNew.id) {
        catClone = { ...categoryNew };
      } else {
        catClone = { ...cat };
      }
      return catClone;
    });

    setCategories(categoriesClone);

    // history.go();
  };

  const addCategory = (bcategory) => {
    setDialogOpen(false);
    history.go();
  };

  const cardboxWidth = () => {
    if (isMobile) {
      return "100%";
    } else {
      return "75%";
    }
  };

  const cardWidth = () => {
    if (isMobile) {
      return "100%";
    } else {
      return "80%";
    }
  };

  const marginTop = () => {
    if (isMobile) {
      return "8%";
    } else {
      return "1.7%";
    }
  };

  return (
    <CardBox width={cardboxWidth()} marginTop={marginTop()}>
      {/* <Divider /> */}
      <div className={classes.categoryType}>
        <Typography variant="body2">
          <Label color="lightgrey">{"SYSTEM"}</Label>
        </Typography>
      </div>

      {categories
        .sort((item1, item2) => item2.lastUpdated - item1.lastUpdated)
        .map((item) => {
          if (!item.userDefined) {
            return (
              <div style={{ width: cardWidth(), display: "flex" }}>
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
            <div style={{ width: cardWidth(), display: "flex" }}>
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
