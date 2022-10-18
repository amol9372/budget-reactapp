import { Button, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../UI/card";
import CardBox from "../UI/cardbox";
import Label from "../UI/label";
import CreateEditBudget from "./createEditBudget";

const AllBudgets = (props) => {
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const updateBudget = () => {
    setDialogOpen(false);
    history.go(0);
  };

  return (
    <CardBox width="90%" flexDirection="row">
      {props.budgets &&
        props.budgets.map((budget) => {
          return <BudgetCard budget={budget} id={budget.id} key={budget.id} />;
        })}
      {props.budgets && (
        <>
          <Button
            onClick={() => setDialogOpen(true)}
            variant="contained"
            color="primary"
            //className={classes.button}
            startIcon={<Add />}
          >
            Create new
          </Button>
          <CreateEditBudget
            open={dialogOpen}
            closeDialog={closeDialog}
            existingBudgets={props.budgets.map((item) => item.name)}
            updateBudgetOnSuccess={updateBudget}
          />
        </>
      )}
    </CardBox>
  );
};

const BudgetCard = (props) => {
  const [bg, setBg] = useState();
  const history = useHistory();

  const changeBackGround = () => {
    setBg("#292848");
  };

  const revertBackGround = () => {
    setBg("#282828");
  };

  const budgetView = (budget) => {
    history.push({ pathname: "/budgetview", state: budget });
  };

  return (
    <Card
      width="8%"
      //maxWidth="10%"
      height="140px"
      flex="1 0 15%"
      handleMouseOver={changeBackGround}
      handleMouseOut={revertBackGround}
      handleClick={() => budgetView(props.budget)}
      bgcolor={bg}
      key={props.budget.id}
    >
      <Typography variant="h6">
        <Label color="white">{props.budget.name}</Label>
      </Typography>
      {/* {deleteBudget && (
        <IconButton size="medium">
          <Delete color="error" />
        </IconButton>
      )} */}
    </Card>
  );
};

export default AllBudgets;
