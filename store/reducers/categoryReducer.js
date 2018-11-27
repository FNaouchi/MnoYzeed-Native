import * as actionTypes from "../actions/types";

const initialState = {
  items: null,
  categoryNames: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS:
      return {
        ...state,
        items: action.payload,
        categoryNames: action.payload.map(name => name.name)
      };
    default:
      return state;
  }
};

export default reducer;
