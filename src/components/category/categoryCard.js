import { makeStyles, Typography } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Card from "../UI/card";
import Label from "../UI/label";
import EditCatgory from "./editCategory";

const useStyles = makeStyles({
  rent: {
    marginLeft: "10px",
    display: "flex",
    flex: "2 1 auto",
    flexWrap: "wrap",
  },
  circularProgressbar: {
    maxWidth: "60px",
    maxHeight: "60px",
    // marginBlock: "10px",
    fontWeight: "bold",
  },
  alloacted: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
});

const CategoryCard = (props) => {
  const categoryItemsStyle = useStyles();
  const [bg, setBg] = useState();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const changeBackGround = () => {
    setBg("#292848");
  };

  const revertBackGround = () => {
    setBg("#282828");
  };

  const progress = () => {
    if (props.item.available > 0.0) {
      const percent =
        ((props.item.allocated - props.item.available) / props.item.allocated) *
        100;
      return Number(percent).toPrecision(2);
    }
    return 0;
  };

  const handleEdit = () => {
    //props.handleEdit(true);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Card
        padding="0.5%"
        flexDirection="row"
        flexGap="10%"
        width="100%"
        maxWidth="100%"
        handleMouseOver={changeBackGround}
        handleMouseOut={revertBackGround}
        handleClick={handleEdit}
        bgcolor={bg}
      >
        <div className={categoryItemsStyle.rent}>
          <Typography variant="h6">
            <Label color="white">{props.item.name}</Label>
          </Typography>
        </div>
        <div className={categoryItemsStyle.alloacted}>
          <Typography variant="caption">
            <Label color="rgb(112, 229, 249)">Allocated</Label>
          </Typography>
          <Typography variant="subtitle1">
            <Label color="white" background="lightgreen">
              ${props.item.allocated ? props.item.allocated : 0}
            </Label>
          </Typography>
        </div>
        <div className={categoryItemsStyle.alloacted}>
          <Typography variant="caption">
            <Label color="rgb(112, 119, 199)">Available</Label>
          </Typography>
          <Typography variant="subtitle1">
            <Label color="white">
              ${props.item.available ? props.item.available : 0}
            </Label>
          </Typography>
        </div>
        <div className={categoryItemsStyle.circularProgressbar}>
          <CircularProgressbar
            value={progress()}
            text={`${progress()}%`}
            styles={buildStyles({
              textSize: "25px",
              trailColor: "white",
            })}
          />
        </div>
      </Card>
      <EditCatgory
        category={props.item}
        open={dialogOpen}
        closeDialog={closeDialog}
        // existingCategories={categories.map((cat) => cat.name)}
        updateCategoriesOnSuccess={(cat) => {
          props.updateCategory(cat);
          setDialogOpen(false);
        }}
      />
    </>
  );
};

export default CategoryCard;
