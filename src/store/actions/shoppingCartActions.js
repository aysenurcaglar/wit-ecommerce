// Action Types
export const SET_CART = "SET_CART";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ADDRESS = "SET_ADDRESS";
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_ITEM_COUNT = "UPDATE_ITEM_COUNT";
export const TOGGLE_ITEM_CHECK = "TOGGLE_ITEM_CHECK";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

// Action Creators
export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});
export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});
export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const updateItemCount = (productId, count) => ({
  type: UPDATE_ITEM_COUNT,
  payload: { productId, count },
});
export const toggleItemCheck = (productId) => ({
  type: TOGGLE_ITEM_CHECK,
  payload: productId,
});
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
export const clearCart = () => ({ type: CLEAR_CART });

export const getCartItems = (state) => state.cart.cart;
export const getCartTotal = (state) => {
  return state.cart.cart.reduce((total, item) => {
    if (item.checked) {
      return total + item.product.price * item.count;
    }
    return total;
  }, 0);
};
export const getCartItemCount = (state) => {
  return state.cart.cart.reduce((total, item) => total + item.count, 0);
};
export const getCheckedItems = (state) => {
  return state.cart.cart.filter((item) => item.checked);
};
