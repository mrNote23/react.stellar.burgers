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
  include?: number;
};

export type TBurger = {
  bun: TIngredient | null;
  filling: TIngredient[];
};

export type TCreateOrder = {
  ingredients: string[];
};

export type TOrder = {
  name?: string;
  order?: {
    number: number;
  };
  success: boolean;
};
