import { createSlice } from "@reduxjs/toolkit";
import { TBurger, TIngredient } from "../../types";

const initialState: TBurger = {
  bun: null,
  filling: [],
};

export const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    burgerAddIngredient: (state, action) => {
      const ingredient = action.payload;
      if (ingredient.type === "bun") {
        state.bun = ingredient;
      } else {
        state.filling.push(ingredient);
      }
    },
    burgerRemoveIngredient: (state, action) => {
      state.filling = state.filling.filter(
        (item) => item.id !== action.payload
      );
    },
    burgerClearIngredients: () => {
      return initialState;
    },
    burgerSwapIngredients: (state, action) => {
      const tmp: TIngredient[] = [...state.filling];
      [tmp[action.payload.first], tmp[action.payload.second]] = [
        tmp[action.payload.second],
        tmp[action.payload.first],
      ];
      return { ...state, filling: [...tmp] };
    },
  },
});

export const {
  burgerAddIngredient,
  burgerRemoveIngredient,
  burgerClearIngredients,
  burgerSwapIngredients,
} = burgerSlice.actions;
export default burgerSlice.reducer;
