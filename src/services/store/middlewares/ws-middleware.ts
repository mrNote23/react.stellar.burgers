import { Middleware } from "redux";
import { feedSlice } from "@store/reducers/feed-reducer";
import { WS_URL } from "@config/constants";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { userOrdersSlice } from "@store/reducers/user-orders-reducer";
import { TWsOrdersListError, TWsOrdersListPrepared } from "@config/types";
import { ordersListPrepare } from "@utils/orders-list-prepare";

export type WsMiddlewareProps = {
  wsUrl: string;
  start: ActionCreatorWithoutPayload;
  stop: ActionCreatorWithoutPayload;
  onLoad: ActionCreatorWithPayload<TWsOrdersListPrepared>;
  onError: ActionCreatorWithPayload<TWsOrdersListError>;
  onConnect: ActionCreatorWithPayload<boolean>;
};

export const feedMiddlewareProps: WsMiddlewareProps = {
  wsUrl: `${WS_URL}/orders/all`,
  start: feedSlice.actions.loadAllData,
  stop: feedSlice.actions.closeAllData,
  onLoad: feedSlice.actions.onLoadAllData,
  onError: feedSlice.actions.onErrorAllData,
  onConnect: feedSlice.actions.onConnectAllData,
};

export const userOrdersMiddlewareProps: WsMiddlewareProps = {
  wsUrl: `${WS_URL}/orders?token=`,
  start: userOrdersSlice.actions.loadUserData,
  stop: userOrdersSlice.actions.closeUserData,
  onLoad: userOrdersSlice.actions.onLoadUserData,
  onError: userOrdersSlice.actions.onErrorUserData,
  onConnect: userOrdersSlice.actions.onConnectUserData,
};

export const wsMiddleware = (props: WsMiddlewareProps): Middleware => {
  return (store) => {
    return (next) => {
      let ws: WebSocket | null = null;
      let wsUrl: string;
      let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
      const openWs = () => {
        if (ws) {
          return;
        }
        ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
          store.dispatch(
            props.onLoad(ordersListPrepare(JSON.parse(event.data)))
          );
        };

        ws.onopen = () => {
          store.dispatch(props.onConnect(true));
        };

        ws.onclose = (event: CloseEvent) => {
          if (event.code !== 1005) {
            store.dispatch(props.onConnect(false));
            reconnectTimeout = setTimeout(() => {
              reconnectTimeout = null;
              openWs();
            }, 3000);
          }
        };

        ws.onerror = () => {
          store.dispatch(
            props.onError({
              success: false,
              message: "Что-то пошло не так",
            })
          );
        };
      };
      return (action) => {
        switch (true) {
          case props.start.match(action):
            wsUrl = action.payload
              ? `${props.wsUrl}${action.payload}`
              : props.wsUrl;
            openWs();
            break;
          case props.stop.match(action):
            if (reconnectTimeout) {
              clearTimeout(reconnectTimeout);
              reconnectTimeout = null;
            }
            ws && (ws as WebSocket).close();
            ws = null;
            break;
        }
        return next(action);
      };
    };
  };
};
