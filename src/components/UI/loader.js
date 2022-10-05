import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker({ area: props.area });

  return promiseInProgress && <CircularProgress color="secondary" />;
};

export default LoadingIndicator;
