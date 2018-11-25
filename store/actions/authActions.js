import * as actionTypes from "./types";
import axios from "axios";
import { AsyncStorage } from "react-native";
import jwt_decode from "jwt-decode";
const setAuthToken = token => {
  if (token) {
    AsyncStorage.setItem("token", token).then(
      (axios.defaults.headers.common.Authorization = `jwt ${token}`)
    );
  } else {
    AsyncStorage.removeItem("token").then(
      delete axios.defaults.headers.common.Authorization
    );
  }
};
export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    AsyncStorage.getItem("token")
      .then(token => {
        if (token) {
          const currentTime = Date.now() / 1000;
          // Decode token and get user info
          const user = jwt_decode(token);
          // Check token expiration
          if (user.exp >= currentTime) {
            // Set auth token header
            setAuthToken(token);
            // Set user
            dispatch(setCurrentUser(user));
          } else {
            dispatch(logout());
          }
        }
      })
      .catch(err => console.error(err));
  };
};
export const loginUser = (userData, navigation) => {
  return dispatch => {
    axios
      .post("http://127.0.0.1:8000/api/login/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        navigation.setParams({ isAuthenticated: true });
        navigation.replace("CoffeeList");
      })
      .catch(error => console.log(error));
  };
};

export const registerUser = (userData, navigation) => {
  return dispatch => {
    axios
      .post("http://127.0.0.1:8000/api/register/", userData)
      .then(() =>
        dispatch(
          loginUser(
            { username: userData.username, password: userData.password },
            navigation
          )
        )
      )
      .catch(error => console.log(error.response.data));
  };
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};

export const setErrors = errors => ({
  type: actionTypes.SET_ERROR,
  payload: errors
});
