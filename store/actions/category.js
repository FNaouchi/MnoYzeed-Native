import axios from "axios";
import * as actionTypes from "./types";

export const fetchItems = () => {
  return dispatch => {
    axios
      .get("http://127.0.0.1:8000/api/items/")
      .then(res => res.data)
      .then(items =>
        dispatch({
          type: actionTypes.FETCH_ITEMS,
          payload: items
        })
      );
  };
};
