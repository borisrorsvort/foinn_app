import { TOGGLE_DRAWER, TOGGLE_FILTERS } from "../constants/actionTypes";

function ui(
  state = {
    showDrawer: false,
    showFilters: false
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
    default:
      return state;
  }
}

export default ui;
