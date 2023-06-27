import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@config/types";
import Api from "@utils/api";

export const loadIngredients = createAsyncThunk(
  "ingredients/loadIngredients",
  () => {
    return Api.loadIngredients();
  }
);

const initialState: {
  ingredients: TIngredient[];
  loading: boolean;
  error: boolean;
} = {
  ingredients: [],
  loading: false,
  error: false,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    ingredientsCountersReset: (state) => {
      return {
        ...state,
        ingredients: state.ingredients.map((item) => {
          return { ...item, include: 0 };
        }),
      };
    },
    ingredientCounterInc: (state, action) => {
      return {
        ...state,
        ingredients: state.ingredients.map((item) => {
          return item._id === action.payload
            ? {
                ...item,
                include: item.include + (item.type === "bun" ? 2 : 1),
              }
            : item;
        }),
      };
    },
    ingredientCounterDec: (state, action) => {
      return {
        ...state,
        ingredients: state.ingredients.map((item) => {
          return item._id === action.payload
            ? {
                ...item,
                include: item.include - (item.type === "bun" ? 2 : 1),
              }
            : item;
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, () => {
        return {
          loading: true,
          error: false,
          ingredients: [],
        };
      })
      .addCase(loadIngredients.rejected, () => {
        return {
          loading: false,
          error: true,
          ingredients: [],
        };
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        return {
          loading: false,
          error: false,
          ingredients: (action.payload.data as TIngredient[]).map(
            (item: TIngredient) => {
              return { ...item, include: 0 };
            }
          ),
        };
      });
  },
});

export const {
  ingredientsCountersReset,
  ingredientCounterInc,
  ingredientCounterDec,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
