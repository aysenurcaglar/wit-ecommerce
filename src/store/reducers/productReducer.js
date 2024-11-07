import { current } from 'immer';
import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_CURRENT_PAGE
} from '../actions/productActions';

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 20, // Default limit for pagination is 25
  offset: 0, // Default offset for pagination
  filter: '',
  fetchState: 'NOT_FETCHED', // Can be 'NOT_FETCHED', 'FETCHING', 'FETCHED', 'FAILED'
  currentPage: 1,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
      case SET_PRODUCT_LIST:
        return {
          ...state,
          productList: action.payload,  // Replace existing products with new ones
        };
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
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
