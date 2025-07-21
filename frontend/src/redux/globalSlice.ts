import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  isWishlistFilterActive: boolean;
}

const initialState: GlobalState = {
  isWishlistFilterActive: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setWishlistFilterActive(state, action: PayloadAction<boolean>) {
      state.isWishlistFilterActive = action.payload;
    },
  },
});

export const { setWishlistFilterActive } = globalSlice.actions;
export default globalSlice.reducer;
