import axios from "axios";
import * as actionTypes from "./types";

export const setLoading = () => ({
  type: actionTypes.LOAD_ITEM_DETAIL
});

export const fetchItems = () => {
  return dispatch => {
    axios
      .get("http://104.248.37.122/api/items/")
      .then(res => res.data)
      .then(items =>
        dispatch({
          type: actionTypes.FETCH_ITEMS,
          payload: items
        })
      );
  };
};
export const fetchItemDetail = itemID => {
  return dispatch => {
    axios
      .get(`http://104.248.37.122/api/items/${itemID}/`)
      .then(res => res.data)
      .then(item => {
        dispatch({
          type: actionTypes.FETCH_ITEM_DETAIL,
          payload: item
        });
      })
      .catch(err => console.error(err));
  };
};

export const postBiddings = (itemID, userBidder) => {
  return dispatch => {
    axios
      .post(`http://104.248.37.122/api/items/${itemID}/bid/`, userBidder)
      .then(res => res.data)
      .then(item => {
        dispatch({
          type: actionTypes.POST_BIDDINGS,
          payload: item
        });
      })
      .catch(err => console.error(err));
  };
};
