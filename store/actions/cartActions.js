// Types
import * as actionTypes from "./types";

// Add item to Cart
export const addItemToCart = (item, cart) => dispatch => {
  const index = cart.findIndex(
    cartItem => cartItem.drink == item.drink && cartItem.option == item.option
  );
  if (index >= 0) {
    cart[index].quantity++;
  } else {
    cart.push(item);
  }
  dispatch({
    type: actionTypes.ADD_ITEM,
    payload: cart
  });
};

// Remove item from cart
export const removeItemFromCart = item => dispatch => {
  dispatch({
    type: actionTypes.REMOVE_ITEM,
    payload: item
  });
};

// Checkout
export const checkoutCart = () => dispatch => {
  dispatch({
    type: actionTypes.CHECKOUT
  });
};
