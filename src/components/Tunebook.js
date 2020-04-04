import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import { fetchTuneBook } from "../actions/tuneBook";
import { connect } from "react-redux";
import Tune from "./Tune";
import { withRouter } from "react-router-dom";
import store from "../store";
import TuneList from "./TuneList";

function Tunebook(props) {
  const {
    match: { url },
    items,
    userId
  } = props;

  useEffect(() => {
    if (!items.length) {
      store.dispatch(fetchTuneBook(userId));
    }
  }, [userId, items.length]);

  return (
    <div>
      <TuneList items={items} />
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
