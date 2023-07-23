import { OrderStatus } from "@config/constants";

export type TOriginalIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  qty?: number;
};

export type TIngredient = TOriginalIngredient & {
  id?: string;
  include: number;
  locked?: boolean;
};

export type TBurger = {
  bun: TIngredient | null;
  filling: TIngredient[];
};

export type TOrder = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
  loading: boolean;
};

export type TUser = {
  success: boolean;
  user: {
    name: string;
    email: string;
  };
  userLoading: boolean;
  error?: string;
  authorized: boolean;
  authProcess?: boolean;
  accessToken: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type TUserRegister = {
  name: string;
  email: string;
  password: string;
};

export type TWsOrdersList = {
  orders: TWsOrder[];
  success: boolean;
  total: number;
  totalToday: number;
  connected: boolean;
};

export type TWsOrdersListError = {
  success: boolean;
  message: string;
};

export type TWsOrdersListPrepared = {
  orders: TWsOrderPrepared[];
  success: boolean;
  total: number;
  totalToday: number;
  connected: boolean;
  message?: string | null;
};

export type TWsOrder = {
  _id: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export type TWsOrderPrepared = {
  _id: string;
  ingredients: TOriginalIngredient[];
  name: string;
  number: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};
