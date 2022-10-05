import { Button } from "@material-ui/core";
import React from "react";

const Child = (props) => {
  function handle() {
    props.onchange();
  }

  return (
    <Button variant="outlined" color="default" onClick={handle}>
      Child
    </Button>
  );
};

export default Child;
