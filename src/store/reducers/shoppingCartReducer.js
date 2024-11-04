import { 
    SET_CART, 
    SET_PAYMENT, 
    SET_ADDRESS 
  } from '../actions/shoppingCartActions';
  
  const initialState = {
    cart: [], // Each item is an object with count and product details
    payment: {}, // Payment information object
    address: {}, // Address information object
  };
  
  export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CART:
        return { ...state, cart: action.payload };
      case SET_PAYMENT:
        return { ...state, payment: action.payload };
      case SET_ADDRESS:
        return { ...state, address: action.payload };
      default:
        return state;
    }
  };
  