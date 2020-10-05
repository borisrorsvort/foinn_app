import { Route } from "react-router-dom";
import Fuse from "fuse.js";
import React, { useEffect } from "react";
import { fetchSets } from "../actions/sets";
import { connect } from "react-redux";
import Set from "./Set";
import { withRouter } from "react-router-dom";
import TuneList from "./TuneList";
import PageLoading from "./PageLoading";
import { withSnackbar } from "notistack";
import { CircularProgress } from "@material-ui/core";
import { fuseoptions } from "../helpers/searchHelper";

function Sets(props) {
  const {
    match: { url },
    items,
    userId,
    isFetching,
    userChanged,
    fetchSets,
    filters,
    enqueueSnackbar,
    closeSnackbar
  } = props;

  useEffect(() => {
    if (userChanged || !items.length) {
      const snack = enqueueSnackbar("Syncing sets!", {
        variant: "success",
        persist: true,
        action: <CircularProgress />
      });
      fetchSets(userId, snack).finally(() => {
        closeSnackbar(snack);
      });
    }
  }, [
    userId,
    items.length,
    userChanged,
    fetchSets,
    enqueueSnackbar,
    closeSnackbar
  ]);

  const fuse = new Fuse(items, fuseoptions);
  let filteredTunes = filters.search
    ? fuse.search(filters.search || "").map((item) => item.item)
    : items;

  const withType = filteredTunes.filter(
    (item) => !filters.tuneType || item.type === filters.tuneType
  );

  return (
    <div>
      {isFetching ? <PageLoading /> : <TuneList items={withType} />}
      <Route path={`${url}/:setId?`}>
        <Set referrer={url} />
      </Route>
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return {
    items: state.sets.sets,
    isFetching: state.sets.isFetching,
    userChanged: state.session.currentUser.id !== props.userId,
    filters: state.ui.tuneFilters
  };
};

export default connect(mapStateToProps, { fetchSets })(
  withSnackbar(withRouter(Sets))
);
