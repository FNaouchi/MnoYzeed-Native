import * as actionTypes from "../actions/types";

const initialState = {
  items: null,
  categoryNames: [],
  item: null,
  loading: true,
  bidders: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS:
      return {
        ...state,
        items: action.payload,
        categoryNames: action.payload.map(name => name.name)
      };
    case actionTypes.FETCH_ITEM_DETAIL:
      return {
        ...state,
        item: action.payload,
        loading: false
      };
    case actionTypes.LOAD_ITEM_DETAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.POST_BIDDINGS:
      return {
        ...state,
        bidders: state.bidders.concat(action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
