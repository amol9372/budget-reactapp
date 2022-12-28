import { makeStyles, Typography } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
// import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { isMobile } from "react-device-detect";
import Card from "../UI/card";
import Label from "../UI/label";
import EditCatgory from "./editCategory";

const useStyles = makeStyles((theme) => ({
  name: {
    marginLeft: "10px",
    display: "flex",
    // flex: "2 1 auto",
    flex: "0 0 22%",
    //flexWrap: "wrap",
    gap: "30px",
  },
  circularProgressbar: {
    maxWidth: "60px",
    maxHeight: "60px",
    // marginBlock: "10px",
    fontWeight: "bold",
  },
  allocated: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 8%",
    gap: "5px",
  },
  subCategory: {
    margin: "4px",
  },
  // delete after
}));

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
    // if (props.item.used > 0.0) {
    const percent =
      ((props.item.allocated - props.item.used) / props.item.allocated) * 100;
    return 100 - Number(percent).toPrecision(2);
    // }
    // return 0;
  };

  const handleEdit = () => {
    //props.handleEdit(true);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const getAvailableColor = () => {
    if (props.item.used < 0.0) {
      return "red";
    } else if (props.item.used === 0.0) {
      return "grey";
    } else {
      return "lightgreen";
    }
  };

  const getAvailableLabel = () => {
    const color = getAvailableColor();
    let used = props.item.used;
    if (color === "red") {
      used = -props.item.used;
    }
    return <Label color={color}>${used}</Label>;
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
        <div className={categoryItemsStyle.name}>
          <Typography variant="h7">
            <Label color="white">{props.item.name}</Label>
          </Typography>
        </div>
        {/* <div>
          <Badge bg={getBadgeColor()} style={{ flex: "0 0 8%" }}>
            <h6>
            {props.item.subCategory ? props.item.subCategory : "essentials"}
            </h6>
          </Badge>
        </div> */}
        {/* <div style={{ flex: "0 0 15%" }}>
          <Typography variant="subtitle2">
            <Label
              color="white"
              background={getBadgeColor()}
              borderRadius="100%"
              padding="7px"
            >
              {props.item.subCategory ? props.item.subCategory : "essentials"}
            </Label>
          </Typography>
        </div> */}

        <div className={categoryItemsStyle.allocated}>
          <Typography variant="caption">
            <Label color="rgb(112, 229, 249)">Allocated</Label>
          </Typography>
          <Typography variant="subtitle1">
            <Label color="white">
              ${props.item.allocated ? props.item.allocated : 0}
            </Label>
          </Typography>
        </div>

        <div className={categoryItemsStyle.allocated}>
          <Typography variant="caption">
            <Label color="rgb(112, 119, 199)">Available</Label>
          </Typography>
          <Typography variant="subtitle1">{getAvailableLabel()}</Typography>
        </div>

        {/* <div className={categoryItemsStyle.circularProgressbar}>
          <CircularProgressbar
            value={progress()}
            text={`${progress()}%`}
            styles={buildStyles({
              textSize: "22px",
              trailColor: "lightgrey",
              pathColor: "green",
              textColor: "white",
            })}
          />
        </div> */}
        {!isMobile && (
          <div className={categoryItemsStyle.alloacted}>
            <Typography variant="inherit">
              <Label color="white">
                Spent {props.item.allocated - props.item.used} out of{" "}
                {props.item.allocated}
              </Label>
            </Typography>
          </div>
        )}
      </Card>
      <EditCatgory
        category={props.item}
        open={dialogOpen}
        closeDialog={closeDialog}
        // existingCategories={categories.map((cat) => cat.name)}
        deleteCategoryOnSuccess={(cat) => {
          props.deleteCategory(cat);
        }}
        updateCategoriesOnSuccess={(cat) => {
          props.updateCategory(cat);
          setDialogOpen(false);
        }}
      />
    </>
  );
};

export default CategoryCard;
