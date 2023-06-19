import { TIngredient } from "../../config/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TIngredient | {} = {};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    detailsSet: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { detailsSet } = detailsSlice.actions;
export default detailsSlice.reducer;
