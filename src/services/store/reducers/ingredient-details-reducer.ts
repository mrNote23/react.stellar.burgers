import { createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@config/types";

const initialState: TIngredient | null = null;

export const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setIngredientDetails: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setIngredientDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
