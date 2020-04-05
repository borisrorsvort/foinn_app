import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import { fetchTuneBook } from "../actions/tuneBook";
import { connect } from "react-redux";
import Tune from "./Tune";
import { withRouter } from "react-router-dom";
import TuneList from "./TuneList";
import PageLoading from "./PageLoading";

function Tunebook(props) {
  const {
    match: { url },
    items,
    userId,
    isFetching,
    userChanged,
    fetchTuneBook
  } = props;

  useEffect(() => {
    if (userChanged || !items.length) {
      fetchTuneBook(userId);
    }
  }, [userId, items.length, userChanged, fetchTuneBook]);

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
export default connect(mapStateToProps, { fetchTuneBook })(
  withRouter(Tunebook)
);
