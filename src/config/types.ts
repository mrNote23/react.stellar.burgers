export type TIngredient = {
  id?: string;
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
