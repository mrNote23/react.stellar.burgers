import { createSlice } from "@reduxjs/toolkit";
import { TWsOrdersListPrepared } from "@config/types";

const initialState: TWsOrdersListPrepared = {
  orders: [],
  success: true,
  total: 0,
  totalToday: 0,
  connected: false,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    loadAllData: (state) => state,
    onConnectAllData: (state, action) => {
      return { ...state, connected: action.payload, message: null };
    },
    onLoadAllData: (state, action) => {
      return { ...state, ...action.payload, message: null };
    },
    onErrorAllData: (state, action) => {
      return { ...state, ...action.payload };
    },
    closeAllData: (state) => {
      return { ...state, connected: false, message: null };
    },
  },
});

export const {
  loadAllData,
  onLoadAllData,
  onErrorAllData,
  closeAllData,
  onConnectAllData,
} = feedSlice.actions;
export default feedSlice.reducer;
