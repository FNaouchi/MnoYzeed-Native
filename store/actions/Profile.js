import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./types";

const setLoading = () => ({
  type: actionTypes.SET_PROFILE_LOADING
});

export const fetchProfileDetail = userID => {
  return dispatch => {
    axios
      .get(`http://104.248.37.122/api/profile/${userID}/`)
      .then(res => res.data)
      .then(profile => {
        dispatch({
          type: actionTypes.FETCH_PROFILE_DETAIL,
          payload: profile
        });
      })
      .catch(err => console.error(err));
  };
};
