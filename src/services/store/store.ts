import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@store/root-reducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
export type TRootState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
