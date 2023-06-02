import { createContext, Dispatch } from "react";
import { TIngredient } from "../types";

type TIngredientsContext = {
  data: TIngredient[];
  dispatchIngredients: Dispatch<any>;
};

export const IngredientsContext = createContext<TIngredientsContext>({
  data: [],
  dispatchIngredients: () => null,
});
