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
import { withSnackbar } from "notistack";
import { CircularProgress } from "@material-ui/core";
import { fuseoptions } from "../helpers/searchHelper";

function Tunebook(props) {
  const {
    match: { url },
    items,
    userId,
    isFetching,
    userChanged,
    fetchTuneBook,
    filters,
    enqueueSnackbar,
    closeSnackbar
  } = props;

  useEffect(() => {
    if (userChanged || !items.length) {
      const snack = enqueueSnackbar("Syncing tunebook!", {
        variant: "success",
        persist: true,
        action: <CircularProgress />
      });
      fetchTuneBook(userId, snack).finally(() => {
        closeSnackbar(snack);
      });
    }
  }, [
    userId,
    items.length,
    userChanged,
    fetchTuneBook,
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
  withSnackbar(withRouter(Tunebook))
);
