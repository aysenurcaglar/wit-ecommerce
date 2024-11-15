import api from "../../api/axios";
import { buildQueryString } from "../../utils/buildQueryString";

// Action Types
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_TOTAL = "SET_TOTAL";
export const SET_FETCH_STATE = "SET_FETCH_STATE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_FILTER = "SET_FILTER";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_SORT = "SET_SORT";
export const SET_PRODUCT = "SET_PRODUCT";
export const SET_CATEGORY = "SET_CATEGORY";

// Action Creators
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});
export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
export const setSort = (sort) => ({ type: SET_SORT, payload: sort });
export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});
export const setCategory = (categoryId) => (
  console.log("setCategory called with categoryId:", categoryId),
  { type: SET_CATEGORY, payload: categoryId }
);

export const fetchCategories = () => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  try {
    const response = await api.get("/categories");
    dispatch(setCategories(response.data));
    dispatch(setFetchState("FETCHED"));
  } catch (error) {
    console.error("Error fetching categories:", error);
    dispatch(setFetchState("FAILED"));
  }
};

export const fetchProducts =
  (params = {}) =>
  async (dispatch, getState) => {
    const { limit, offset, filter, sort, category } = getState().product;

    const query = buildQueryString({
      limit,
      offset,
      category: category || null,
      filter,
      sort: params.sort || sort,
    });

    console.log(
      "Current category:",
      params.category !== undefined ? params.category : category
    );
    console.log("Requesting URL: ", `/products${query}`);

    dispatch(setFetchState("FETCHING"));

    try {
      const response = await api.get(`/products${query}`);
      const data = response.data;
      dispatch(setProductList(data.products));
      dispatch(setTotal(data.total));
      dispatch(setFetchState("FETCHED"));
      console.log("fetched products:", data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch(setFetchState("FAILED"));
    }
  };

export const updateFilter = (newFilter) => (dispatch) => {
  dispatch(setFilter(newFilter));
  dispatch(fetchProducts());
};

export const updateSort = (newSort) => (dispatch, getState) => {
  const { category } = getState().product;
  dispatch(setSort(newSort));
  dispatch(fetchProducts({ sort: newSort, category }));
};

export const updateCategory = (categoryId) => (dispatch) => {
  dispatch(setCategory(categoryId));
  dispatch(setOffset(0));
  dispatch(setCurrentPage(1));
  dispatch(fetchProducts({ category: categoryId }));
};

export const fetchProduct = (productId) => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));

  try {
    const response = await api.get(`/products/${productId}`);
    dispatch(setProduct(response.data));
    dispatch(setFetchState("FETCHED"));
  } catch (error) {
    console.error("Error fetching product:", error);
    dispatch(setFetchState("FAILED"));
  }
};

export const changePage = (page) => (dispatch, getState) => {
  const { limit } = getState().product;

  // Calculate the offset based on the new limit
  const offset = (page - 1) * limit; // Keep offset calculation consistent

  // Dispatch actions to update the current page, limit, and offset
  dispatch(setCurrentPage(page));
  dispatch(setOffset(offset));
  dispatch(fetchProducts());
};

// Function to combine product and category data
const selectProductsWithCategories = (state) => {
  const productList = state.product.productList;
  const categories = state.product.categories;

  return productList.map((product) => ({
    ...product,
    category: categories.find(
      (category) => category.id === product.category_id
    ),
  }));
};

export const initializeShopPage =
  (categoryId = null) =>
  (dispatch) => {
    dispatch(setCategory(categoryId)); // Use passed categoryId instead of always null
    dispatch(setOffset(0));
    dispatch(setCurrentPage(1));
    dispatch(fetchProducts());
  };
