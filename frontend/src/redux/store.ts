import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import addProductReducer from "./addProductSlice";
import wishlistProductReducer from "./wishlistProduct";
import globalReducer from "./globalSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    addProduct: addProductReducer,
    wishlistProduct: wishlistProductReducer,
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
