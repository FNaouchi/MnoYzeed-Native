import { combineReducers } from "redux";

// Reducers
import coffeeReducer from "./coffeeReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import catReducer from "./categoryReducer";

export default combineReducers({
  coffee: coffeeReducer,
  cart: cartReducer,
  auth: authReducer,
  cat: catReducer
});
