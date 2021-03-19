import { Route } from "react-router-dom";
import Fuse from "fuse.js";
import React from "react";
import { fetchTuneBook } from "../actions/tuneBook";
import { connect } from "react-redux";
import Tune from "./Tune";
import { withRouter } from "react-router-dom";
import TuneList from "./TuneList";
import PageLoading from "./PageLoading";
import FiltersDrawer from "./FiltersDrawer";
import TuneFiltersForm from "./FiltersForm/TuneFiltersForm";
import { withSnackbar } from "notistack";
import { fuseoptions } from "../helpers/searchHelper";
import { fetchSets } from "../actions/sets";
import Set from "./Set";

function Tunebook(props) {
  const {
    match: {
      url,
      params: { folder }
    },
    items,
    isFetching,
    filters
  } = props;
  const isTune = folder === "tunes";
  const fuse = new Fuse(items, fuseoptions);
  let filteredTunes = filters.search
    ? fuse.search(filters.search || "").map((item) => item.item)
    : items;

  // Excluding items without type so Sets are not filtered in case filter active in the tune section
  const searchTuneType = (item) => item.type === filters.tuneType;
  const searchSetsSettingsType = (item) =>
    item.settings.map((setting) => setting.type).includes(filters.tuneType);

  const withType = filteredTunes.filter((item) => {
    if (!filters.tuneType) {
      return true;
    }
    return item.type ? searchTuneType(item) : searchSetsSettingsType(item);
  });

  return (
    <div>
      {isFetching ? <PageLoading /> : <TuneList items={withType} />}
      <FiltersDrawer>
        <TuneFiltersForm folder={folder} />
      </FiltersDrawer>
      <Route path={`${url}/:tuneId?`}>
        {isTune ? <Tune referrer={url} /> : <Set referrer={url} />}
      </Route>
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return {
    items: props.folder === "tunes" ? state.tunes.tunes : state.sets.sets,
    isFetching: state.tunes.isFetching,
    userChanged: state.session.currentUser.id !== props.userId,
    filters: state.ui.tuneFilters
  };
};

export default connect(mapStateToProps, { fetchTuneBook, fetchSets })(
  withSnackbar(withRouter(Tunebook))
);
