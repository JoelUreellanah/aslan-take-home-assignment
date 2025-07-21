import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../types";
import { getConfig } from "@/lib/getConfig";

export interface ProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  query: {
    search?: string;
    sortBy?: string;
  };
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
  query: {
    search: "",
    sortBy: "newest", // Default sort option
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    queryParams?: Record<
      string,
      string[] | string | number | boolean | undefined
    >
  ) => {
    const params = { ...queryParams };
    const { data } = await axios.get(`${getConfig().apiUrl}/products`, {
      params,
    });

    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setQuery(state, action) {
      const updatedFilters = { ...state.query, ...action.payload };
      state.query = updatedFilters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching products";
      });
  },
});

export const { setQuery } = productsSlice.actions;
export default productsSlice.reducer;
