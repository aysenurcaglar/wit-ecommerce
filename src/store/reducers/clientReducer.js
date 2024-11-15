import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_LOADING,
  SET_ERROR,
  GET_ADDRESSES,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  GET_CARDS,
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
} from "../actions/clientActions";

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "light",
  language: "en",
  isLoading: false,
  error: null,
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: { ...action.payload } };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case GET_ADDRESSES:
      return { ...state, addressList: action.payload };
    case ADD_ADDRESS:
      return { ...state, addressList: [...state.addressList, action.payload] };
    case UPDATE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.map((address) =>
          address.id === action.payload.id ? action.payload : address
        ),
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.filter(
          (address) => address.id !== action.payload
        ),
      };
    case GET_CARDS:
      return { ...state, creditCards: action.payload };
    case ADD_CARD:
      return { ...state, creditCards: [...state.creditCards, action.payload] };
    case UPDATE_CARD:
      return {
        ...state,
        creditCards: state.creditCards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
      };
    case DELETE_CARD:
      return {
        ...state,
        creditCards: state.creditCards.filter(
          (card) => card.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
