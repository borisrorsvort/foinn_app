import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import { fetchTuneBook } from "../actions/tuneBook";
import { connect } from "react-redux";
import Tune from "./Tune";
import { withRouter } from "react-router-dom";
import DrawerItems from "./DrawerItems";
import store from "../store";
import TuneList from "./TuneList";

function Tunebook(props) {
  const {
    match: { url },
    items
  } = props;

  useEffect(() => {
    store.dispatch(fetchTuneBook(props.userId));
  }, [props.userId]);

  return (
    <div>
      <TuneList items={props.items} />
      <Route path={`${url}/:tuneId`}>
        <Tune referrer={url} />
      </Route>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    userId: state.session.currentUser.id,
    items: state.tunes.tunes
  };
};
export default connect(mapStateToProps)(withRouter(Tunebook));
