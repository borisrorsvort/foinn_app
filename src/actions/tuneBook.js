import * as types from "../constants/actionTypes";
import range from "lodash/range";
import flatMap from "lodash/flatMap";
import axios from "axios";

function requestTuneBook() {
  return {
    type: types.REQUEST_TUNEBOOK
  };
}

function receiveTuneBook(tunes, meta) {
  return {
    type: types.RECEIVE_TUNEBOOK,
    tunes
  };
}

function requestTune() {
  return {
    type: types.REQUEST_TUNE
  };
}

function receiveTune(tune) {
  return {
    type: types.RECEIVE_TUNE,
    currentTune: tune
  };
}

export const fetchTuneBook = memberId => dispatch => {
  dispatch(requestTuneBook());
  let responses = [];

  function fetch(page, rsps) {
    return new Promise(resolve => {
      axios
        .get(`${types.MEMBER_URL}${memberId}/tunebook`, {
          params: { page: page, format: "json", perpage: 50 }
        })
        .then(response => {
          rsps.push(response);
          const {
            data: { page, pages }
          } = response;
          if (!!page && page < pages) {
            axios.all([fetch(page + 1, rsps)]).then(() => resolve());
          } else {
            resolve();
          }
        });
    });
  }

  return fetch(1, responses).then(() => {
    const tunes = flatMap(responses, response => response.data.tunes);
    dispatch(receiveTuneBook(tunes, {}));
  });
};

export const fetchTune = tuneId => dispatch => {
  dispatch(requestTune());
  return axios
    .get(`${types.TUNE_URL}${tuneId}?format=json`)
    .then(function(response) {
      dispatch(receiveTune(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
};
