import { Route } from "react-router-dom";
import Fuse from "fuse.js";
import React, { useEffect } from "react";
import { fetchTuneBook } from "../actions/tuneBook";
import { connect } from "react-redux";
import Tune from "./Tune";
import { withRouter } from "react-router-dom";
import TuneList from "./TuneList";
import PageLoading from "./PageLoading";
import FiltersDrawer from "./FiltersDrawer";
import TuneFiltersForm from "./FiltersForm/TuneFiltersForm";

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

  const fuseoptions = {
    includeScore: false,
    threshold: 0.2,
    findAllMatches: true,
    keys: ["name"]
  };

  const fuse = new Fuse(items, fuseoptions);
  let filteredTunes = props.filters.search
    ? fuse.search(props.filters.search || "").map(item => item.item)
    : items;

  const withType = filteredTunes.filter(
    item => !props.filters.tuneType || item.type === props.filters.tuneType
  );

  return (
    <div>
      {isFetching ? <PageLoading /> : <TuneList items={withType} />}
      <FiltersDrawer>
        <TuneFiltersForm />
      </FiltersDrawer>
      <Route path={`${url}/:tuneId?`}>
        <Tune referrer={url} />
      </Route>
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return {
    items: state.tunes.tunes,
    isFetching: state.tunes.isFetching,
    userChanged: state.session.currentUser.id !== props.userId,
    filters: state.ui.tuneFilters
  };
};

export default connect(mapStateToProps, { fetchTuneBook })(
  withRouter(Tunebook)
);
