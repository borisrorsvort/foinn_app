import {
  RECEIVE_TUNE,
  RECEIVE_TUNEBOOK,
  REQUEST_TUNE,
  REQUEST_TUNEBOOK
} from "../constants/actionTypes";

function tunes(
  state = {
    isFetching: false,
    tunes: [],
    meta: {},
    currentTune: {
      isFetching: false
    }
  },
  action
) {
  switch (action.type) {
    case REQUEST_TUNEBOOK:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_TUNEBOOK:
      const tunes = action.add
        ? [...state.tunes, ...action.tunes]
        : action.tunes;
      return Object.assign({}, state, {
        isFetching: false,
        tunes: tunes,
        meta: action.meta
      });
    case REQUEST_TUNE:
      return Object.assign({}, state, {
        currentTune: {
          isFetching: true
        }
      });
    case RECEIVE_TUNE:
      const currentTune = action.currentTune;
      return Object.assign({}, state, {
        currentTune: {
          ...currentTune,
          isFetching: false
        }
      });
    default:
      return state;
  }
}

export default tunes;