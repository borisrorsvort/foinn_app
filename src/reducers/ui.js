import {
  TOGGLE_DRAWER,
  TOGGLE_FILTERS,
  UPDATE_TUNE_FILTERS
} from "../constants/actionTypes";

function ui(
  state = {
    showDrawer: false,
    showFilters: false,
    tuneFilters: {}
  },
  action
) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        showDrawer: action.forceClose ? false : !state.showDrawer
      };
    case TOGGLE_FILTERS:
      return {
        ...state,
        showFilters: action.forceClose ? false : !state.showFilters
      };
    case UPDATE_TUNE_FILTERS:
      return {
        ...state,
        tuneFilters: action.filters
      };
    default:
      return state;
  }
}

export default ui;
