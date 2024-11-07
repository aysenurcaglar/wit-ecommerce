import api from "../../api/axios";

// Action Types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';

// Action Creators
export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList });
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState });
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });

export const fetchCategories = () => async (dispatch) => {
    dispatch(setFetchState('FETCHING'));
    try {
      const response = await api.get('/categories');
      dispatch(setCategories(response.data));
      dispatch(setFetchState('FETCHED'));
    } catch (error) {
      console.error('Error fetching categories:', error);
      dispatch(setFetchState('FAILED'));
    }
  };

  export const fetchProducts = () => async (dispatch) => {
    try {
      dispatch({ type: SET_FETCH_STATE, payload: 'FETCHING' });
      const response = await api.get('/products');
      const data = response.data;
      dispatch({ type: SET_PRODUCT_LIST, payload: data.products });
      dispatch({ type: SET_TOTAL, payload: data.total });
      dispatch({ type: SET_FETCH_STATE, payload: 'FETCHED' });
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: SET_FETCH_STATE, payload: 'FAILED' });
    }
  };