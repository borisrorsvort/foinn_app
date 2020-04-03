import { Route } from "react-router-dom";
import React from "react";
import Tune from "./Tune";
import { withRouter } from "react-router-dom";
function Tunebook(props) {
  const {
    match: { url }
  } = props;
  return (
    <Route path={`${url}/:tuneId`}>
      <Tune />
    </Route>
  );
}

export default withRouter(Tunebook);
