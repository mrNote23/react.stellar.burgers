import { createSlice } from "@reduxjs/toolkit";
import { TWsOrdersListPrepared } from "@config/types";

const initialState: TWsOrdersListPrepared = {
  orders: [],
  success: true,
  total: 0,
  totalToday: 0,
  connected: false,
};

export const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadUserData: (state, action) => state,
    onConnectUserData: (state, action) => {
      return { ...state, connected: action.payload, message: null };
    },
    onLoadUserData: (state, action) => {
      return { ...state, ...action.payload, message: null };
    },
    onErrorUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    closeUserData: (state) => {
      return { ...state, connected: false, message: null };
    },
  },
});

export const {
  loadUserData,
  onLoadUserData,
  onErrorUserData,
  closeUserData,
  onConnectUserData,
} = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
