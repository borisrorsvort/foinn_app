import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: `calc(100vh - 64px)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

function PageLoading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

export default PageLoading;
