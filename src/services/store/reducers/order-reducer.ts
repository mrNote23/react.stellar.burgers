import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "@utils/api";
import { TOrder } from "@config/types";

export const orderCreate = createAsyncThunk(
  "order/create",
  (ingredients: string[]) => {
    return Api.createOrder(ingredients);
  }
);

const initialState: TOrder = {
  name: "",
  order: {
    number: 0,
  },
  success: false,
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderClear: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderCreate.pending, () => {
        return { ...initialState, loading: true, success: false };
      })
      .addCase(orderCreate.rejected, () => {
        return { ...initialState, loading: false, success: false };
      })
      .addCase(orderCreate.fulfilled, (state, action) => {
        return { ...(action.payload as TOrder), loading: false };
      });
  },
});

export const { orderClear } = orderSlice.actions;
export default orderSlice.reducer;
