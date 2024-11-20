import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { combineReducers } from "redux";

import { clientReducer } from "./reducers/clientReducer";
import { productReducer } from "./reducers/productReducer";
import { shoppingCartReducer } from "./reducers/shoppingCartReducer";

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  cart: shoppingCartReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});

export default store;
