import api from "../../api/axios";

// Action Types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// Action Creators
export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList });
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState });
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page });

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

  export const fetchProducts = () => async (dispatch, getState) => {
    const { limit, offset } = getState().product;
    dispatch(setFetchState('FETCHING'));
    try {
      const response = await api.get(`/products?limit=${limit}&offset=${offset}`);
      const data = response.data;
      dispatch(setProductList(data.products));
      dispatch(setTotal(data.total));
      dispatch(setFetchState('FETCHED'));
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch(setFetchState('FAILED'));
    }
  };
  
  export const changePage = (page) => (dispatch, getState) => {
     // Calculate the limit based on the page number
     const { total } = getState().product;
  
     // Calculate the limit based on the page number
     const limit = page <= 2 ? 25 : 25 * (page - 1);
     
     
     // Calculate the offset based on the new limit
     const offset = (page - 1) * 25;  // Keep offset calculation consistent

      // Ensure that we don't fetch more products than available
  const remainingProducts = total - offset;
  const adjustedLimit = Math.min(limit, remainingProducts);
     
     // Dispatch actions to update the current page, limit, and offset
     dispatch(setCurrentPage(page));
     dispatch(setLimit(adjustedLimit));
     dispatch(setOffset(offset));
     dispatch(fetchProducts());
  };