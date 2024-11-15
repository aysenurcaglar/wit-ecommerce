import { produce } from "immer";
import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_CURRENT_PAGE,
  SET_SORT,
  SET_PRODUCT,
  SET_CATEGORY,
} from "../actions/productActions";

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 20, // Default limit for pagination is 25
  offset: 0, // Default offset for pagination
  filter: "",
  fetchState: "NOT_FETCHED", // Can be 'NOT_FETCHED', 'FETCHING', 'FETCHED', 'FAILED'
  currentPage: 1,
  sort: "",
  product: null,
  category: null,
};

export const productReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      draft.categories = action.payload;
      break;
    case SET_PRODUCT_LIST:
      draft.productList = action.payload;
      break;
    case SET_TOTAL:
      draft.total = action.payload;
      break;
    case SET_FETCH_STATE:
      draft.fetchState = action.payload;
      break;
    case SET_LIMIT:
      draft.limit = action.payload;
      break;
    case SET_OFFSET:
      draft.offset = action.payload;
      break;
    case SET_FILTER:
      draft.filter = action.payload;
      break;
    case SET_CURRENT_PAGE:
      draft.currentPage = action.payload;
      break;
    case SET_SORT:
      draft.sort = action.payload;
      break;
    case SET_PRODUCT:
      draft.product = action.payload;
      break;
    case SET_CATEGORY:
      draft.category = action.payload;
      break;
    default:
      break;
  }
}, initialState);
