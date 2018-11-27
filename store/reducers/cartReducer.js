import * as actionTypes from "../actions/types";

const initialState = {
  list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return {
        ...state,
        list: action.payload
      };
    case actionTypes.REMOVE_ITEM:
      return {
        ...state,
        list: state.list.filter(item => item !== action.payload)
      };
    case actionTypes.CHECKOUT:
      return {
        ...state,
        list: []
      };
    default:
      return state;
  }
}
