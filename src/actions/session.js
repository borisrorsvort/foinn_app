import {
  LOGOUT,
  MEMBER_URL,
  REQUEST_USER_ID,
  UPDATE_CURRENT_USER
} from "../constants/actionTypes";

import axios from "axios";

export function updateCurrentUser(currentUser) {
  return {
    type: UPDATE_CURRENT_USER,
    currentUser: currentUser
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function requestUserId() {
  return {
    type: REQUEST_USER_ID
  };
}

export const fetchUserId = (query) => {
  return axios
    .get(`${MEMBER_URL}search?q=${query}&format=json`)
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchUser = (userId) => {
  return axios
    .get(`${MEMBER_URL}/${userId}&format=json`)
    .catch(function (error) {
      console.log(error);
    });
};
