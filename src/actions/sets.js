import * as types from "../constants/actionTypes";
import flatMap from "lodash/flatMap";
import sortBy from "lodash/sortBy";

import axios from "axios";
import { updateCurrentUser } from "./session";

function requestSets() {
  return {
    type: types.REQUEST_SETS
  };
}

function receiveSets(sets, meta, add = false) {
  return {
    type: types.RECEIVE_SETS,
    sets: sets,
    meta: meta,
    add: add
  };
}

function requestSet() {
  return {
    type: types.REQUEST_SET
  };
}

function receiveSet(set) {
  return {
    type: types.RECEIVE_SET,
    currentSet: set
  };
}

export const fetchSets = (memberId) => (dispatch) => {
  dispatch(requestSets());
  dispatch(updateCurrentUser({ id: memberId }));

  let responses = [];

  function fetch(page, rsps) {
    return new Promise((resolve) => {
      axios
        .get(`${types.MEMBER_URL}${memberId}/sets`, {
          params: { page: page, format: "json", perpage: 50 }
        })
        .then((response) => {
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
    const sets = sortBy(
      flatMap(responses, (response) => response.data.sets),
      ["name"]
    );
    dispatch(receiveSets(sets, { total: sets.length }));
  });
};

export const fetchSet = (memberId, setId) => (dispatch) => {
  dispatch(requestSet());
  return axios
    .get(`${types.MEMBER_URL}${memberId}/sets/${setId}?format=json`)
    .then(function (response) {
      dispatch(receiveSet(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
