import { Button, makeStyles, Typography } from "@material-ui/core";
import { CategoryRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useHistory } from "react-router-dom";
import CategoryBudgetService from "../../services/catgoryService";
import CardBox from "../UI/cardbox";
import AddCategory from "./addCategory";
import CategoryCard from "./categoryCard";
import { isMobile } from "react-device-detect";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  heading: {
    fontSize: theme.typography.pxToRem(19),
    fontWeight: theme.typography.fontWeightBold,
  },
  accordian: {
    marginLeft: "1%",
    // display: "flex",
    // flex: "2 1 auto",
    // flexWrap: "wrap",
    alignSelf: "flex-start",
    width: "90%",
  },
}));

const CategoryView = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
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

    var catClone = [];

    categories.forEach((cat) => {
      if (cat.subCategory === categoryNew.subCategory) {
        var categoryClone = [];

        cat.categoryBudgets.map((catBudget) => {
          if (catBudget.id === categoryNew.id) {
            categoryClone.push({ ...categoryNew });
          } else {
            categoryClone.push({ ...catBudget });
          }

          return categoryClone;
        });

        catClone.push({
          subCategory: cat.subCategory,
          categoryBudgets: categoryClone,
        });
      } else {
        catClone.push({
          subCategory: cat.subCategory,
          categoryBudgets: cat.categoryBudgets,
        });
      }

      // return catClone;
    });

    console.log(catClone);
    setCategories(catClone);

    // history.go(); // refresh page
  };

  const addCategory = (bcategory) => {
    setDialogOpen(false);
    history.go();
  };

  const deleteCategory = (bcategory) => {
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
      return "95%";
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
      {/* <div className={classes.categoryType}>
        <Typography variant="body2">
          <Label color="lightgrey">{"SYSTEM"}</Label>
        </Typography>
      </div> */}

      {categories.length &&
        categories.map((cat) => {
          const sub = cat.subCategory;
          const categoryBudgets = cat.categoryBudgets;

          return (
            <div className={classes.accordian}>
              <Accordion
                style={{ background: "rgb(48, 47, 47)", color: "white" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="error" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>{sub}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  {categoryBudgets.map((item) => {
                    return (
                      <div style={{ width: cardWidth(), display: "flex" }}>
                        <CategoryCard
                          item={item}
                          key={item.id}
                          id={item.id}
                          updateCategory={updateCategory}
                          deleteCategory={deleteCategory}
                        />
                      </div>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
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

      <AddCategory
        // category={item}
        open={dialogOpen}
        closeDialog={closeDialog}
        existingCategories={categories}
        updateCategoriesOnSuccess={addCategory}
      />
    </CardBox>
  );
};

export default CategoryView;
