import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import { fetchTuneBook } from "../actions/tuneBook";
import { connect } from "react-redux";
import Tune from "./Tune";
import { withRouter } from "react-router-dom";
import store from "../store";
import TuneList from "./TuneList";
import PageLoading from "./PageLoading";

function Tunebook(props) {
  const {
    match: { url },
    items,
    userId,
    isFetching,
    userChanged
  } = props;

  useEffect(() => {
    if (userChanged || !items.length) {
      store.dispatch(fetchTuneBook(userId));
    }
  }, [userId, items.length, userChanged]);

  return (
    <div>
      {isFetching ? <PageLoading /> : <TuneList items={items} />}
      <Route path={`${url}/:tuneId`}>
        <Tune referrer={url} />
      </Route>
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return {
    items: state.tunes.tunes,
    isFetching: state.tunes.isFetching,
    userChanged: state.session.currentUser.id !== props.userId
  };
};
export default connect(mapStateToProps)(withRouter(Tunebook));
