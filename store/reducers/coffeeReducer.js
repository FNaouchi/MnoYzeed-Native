import * as actionTypes from "../actions/types";

const initialState = {
  coffeeshops: null,
  coffeeshop: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_COFFEESHOPS:
      return {
        ...state,
        coffeeshops: action.payload,
        loading: false
      };
    case actionTypes.GET_COFFEESHOP_BY_ID:
      return {
        ...state,
        coffeeshop: action.payload
      };
    case actionTypes.COFFEESHOPS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
