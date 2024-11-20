import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  UPDATE_ITEM_COUNT,
  TOGGLE_ITEM_CHECK,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/shoppingCartActions";

// Initial State
const initialState = {
  cart: [],
  payment: null,
  address: null,
};

// Reducer
export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        // If item exists, increase count
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, count: item.count + 1 }
              : item
          ),
        };
      } else {
        // Add new item with count 1
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              product: action.payload,
              count: 1,
              checked: true,
            },
          ],
        };
      }
    }

    case UPDATE_ITEM_COUNT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.count }
            : item
        ),
      };

    case TOGGLE_ITEM_CHECK:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
};
