import { createContext } from "react";
import { TIngredient } from "../types";

export const IngredientsContext = createContext<TIngredient[]>([]);
