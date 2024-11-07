import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER
} from '../actions/productActions';

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25, // Default limit for pagination
  offset: 0, // Default offset for pagination
  filter: '',
  fetchState: 'NOT_FETCHED', // Can be 'NOT_FETCHED', 'FETCHING', 'FETCHED', 'FAILED'
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_PRODUCT_LIST:
      if (state.productList.length === 0) {
        return { ...state, productList: action.payload };
      } else {
        return {
          ...state,
          productList: state.productList.map((product, index) =>
            index === action.payload.index
              ? { ...product, ...action.payload.product }
              : product
          ),
        };
      }
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};
