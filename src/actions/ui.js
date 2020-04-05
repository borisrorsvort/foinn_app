import {
  TOGGLE_DRAWER,
  TOGGLE_FILTERS,
  UPDATE_TUNE_FILTERS
} from "../constants/actionTypes";

export function toggleDrawer(forceClose = false) {
  return {
    type: TOGGLE_DRAWER,
    forceClose
  };
}

export function toggleFilters(forceClose = false) {
  return {
    type: TOGGLE_FILTERS,
    forceClose
  };
}

export function updateTuneFilters(filters) {
  return {
    type: UPDATE_TUNE_FILTERS,
    filters
  };
}
