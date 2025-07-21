import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig } from "@/lib/getConfig";
import { Offer } from "@/types";

interface AddProductState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AddProductState = {
  status: "idle",
  error: null,
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData: { name: string; offer?: Offer }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${getConfig().apiUrl}/products`,
        productData
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message || "Failed to create product"
        );
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);

const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    resetAddProductState(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetAddProductState } = addProductSlice.actions;
export default addProductSlice.reducer;
