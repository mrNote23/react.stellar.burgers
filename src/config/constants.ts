export const API_URL = "https://norma.nomoreparties.space/api";
export const WS_URL = "wss://norma.nomoreparties.space";

export const ACCESS_TOKEN_NAME = "accessToken";
export const REFRESH_TOKEN_NAME = "refreshToken";

export const ACCESS_COOKIE_OPTIONS = {
  expires: 20 * 60,
};

export const RESET_PASSWORD_COOKIE_NAME = "resettingPassword";
export const RESET_PASSWORD_COOKIE_OPTIONS = {
  expires: 1 * 60 * 60,
};

export const PATH = {
  HOME: "/",
  INGREDIENTS: "/ingredients",
  PROFILE: "/profile",
  ORDERS: "/orders",
  PROFILE_ORDERS: "/profile/orders",
  FEED: "/feed",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  ERROR: "/error",
};

export enum OrderStatus {
  created = "created",
  pending = "pending",
  done = "done",
}

export const OrderStatusTitle = {
  [OrderStatus.created]: "Создан",
  [OrderStatus.pending]: "Готовится",
  [OrderStatus.done]: "Выполнен",
};
