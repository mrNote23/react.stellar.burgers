import { configureStore } from "@reduxjs/toolkit";
import { loggerMiddleware } from "@store/middlewares/logger-middleware";
import rootReducer from "@store/root-reducer";
import {
  feedMiddlewareProps,
  userOrdersMiddlewareProps,
  wsMiddleware,
} from "@store/middlewares/ws-middleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

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

export const useAppDispatch = useDispatch<typeof store.dispatch>;

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
