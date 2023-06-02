import { TIngredient } from "../types";

export type TIngredientAction = {
  type: string;
  payload: unknown;
};

export type TIngredientPayload = {
  id: string;
  quantity: number;
};

export const ingredientsReducer = (
  state: TIngredient[],
  action: TIngredientAction
): TIngredient[] => {
  const { type, payload } = action;
  switch (type) {
    case "set":
      return payload as TIngredient[];
    case "reset":
      return state.map((item) => {
        return { ...item, include: 0 };
      });
    case "add":
      return state.map((item) => {
        return item._id !== (payload as TIngredientPayload).id
          ? item
          : {
              ...item,
              include: item.include
                ? item.include! + (payload as TIngredientPayload).quantity
                : (payload as TIngredientPayload).quantity,
            };
      }) as TIngredient[];
    case "remove":
      return state.map((item) => {
        return item._id !== (payload as TIngredientPayload).id
          ? item
          : {
              ...item,
              include: item.include
                ? item.include - (payload as TIngredientPayload).quantity
                : 0,
            };
      }) as TIngredient[];
    default:
      return state;
  }
};
