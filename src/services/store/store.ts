import { configureStore } from "@reduxjs/toolkit";
import { loggerMiddleware } from "@store/middlewares/logger-middleware";
import rootReducer from "@store/root-reducer";
import {
  feedMiddlewareProps,
  userOrdersMiddlewareProps,
  wsMiddleware,
} from "@store/middlewares/ws-middleware";

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      loggerMiddleware(false),
      wsMiddleware(feedMiddlewareProps),
      wsMiddleware(userOrdersMiddlewareProps),
    ]);
  },
});

export default store;
export type TRootState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
