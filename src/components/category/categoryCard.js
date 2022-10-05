import { IconButton, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Card from "../UI/card";
import Label from "../UI/label";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Edit } from "@material-ui/icons";
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
  const [open, setOpen] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const progress = () => {
    if (props.available > 0.0) {
      const percent =
        ((props.allocated - props.available) / props.allocated) * 100;
      return Number(percent).toPrecision(2);
    }
    return 0;
  };

  return (
    <Card
      padding="0.5%"
      flexDirection="row"
      flexGap="10%"
      width="100%"
      maxWidth="100%"
    >
      <div className={categoryItemsStyle.rent}>
        <Typography variant="h6">
          <Label color="white">{props.name}</Label>
        </Typography>
      </div>
      <div className={categoryItemsStyle.alloacted}>
        <Typography variant="caption">
          <Label color="rgb(112, 229, 249)">Allocated</Label>
        </Typography>
        <Typography variant="subtitle1">
          <Label color="white">${props.allocated ? props.allocated : 0}</Label>
        </Typography>
      </div>
      <div className={categoryItemsStyle.alloacted}>
        <Typography variant="caption">
          <Label color="rgb(112, 119, 199)">Available</Label>
        </Typography>
        <Typography variant="subtitle1">
          <Label color="white">${props.available ? props.available : 0}</Label>
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
      {/* <div className={categoryItemsStyle.editIcon}>
        <IconButton size="medium" onClick={() => setDialogOpen(true)}>
          <Edit color="primary" />
          <EditCatgory
            open={dialogOpen}
            closeDialog={closeDialog}
            existingCategories={labels.map((label) => label.name)}
            updateLabelsOnSuccess={updateLabels}
          />
        </IconButton>
      </div> */}
    </Card>
  );
};

export default CategoryCard;
