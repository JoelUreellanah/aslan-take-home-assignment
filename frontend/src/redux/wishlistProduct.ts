import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig } from "@/lib/getConfig";

interface WishlistProductState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WishlistProductState = {
  status: "idle",
  error: null,
};

export const wishlistProduct = createAsyncThunk(
  "products/wishlistProduct",
  async (productId: string, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${getConfig().apiUrl}/products/${productId}/wishlist`
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message || "Failed to update wishlist"
        );
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);

const wishlistProductSlice = createSlice({
  name: "wishlistProduct",
  initialState,
  reducers: {
    resetWishlistProductState(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(wishlistProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(wishlistProduct.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(wishlistProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetWishlistProductState } = wishlistProductSlice.actions;
export default wishlistProductSlice.reducer;
