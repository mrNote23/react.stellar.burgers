import {
  TOriginalIngredient,
  TWsOrder,
  TWsOrderPrepared,
  TWsOrdersList,
  TWsOrdersListPrepared,
} from "@config/types";
import store from "@store/store";

export const ordersListPrepare = (
  feed: TWsOrdersList
): TWsOrdersListPrepared => {
  const ingredientsData = store.getState().ingredients.ingredients;
  const ordersResult = feed.orders.map((order: TWsOrder): TWsOrderPrepared => {
    let totalPrice = 0;

    const tmpIngredients: Record<string, number> = {};
    order.ingredients.forEach((ingredientId: string) => {
      if (tmpIngredients[ingredientId]) {
        tmpIngredients[ingredientId]++;
      } else {
        tmpIngredients[ingredientId] = 1;
      }
    });

    const ingredients: TOriginalIngredient[] = [];
    for (const [id, qty] of Object.entries(tmpIngredients)) {
      const tmp = ingredientsData.find((item) => item._id === id);
      if (tmp) {
        totalPrice += tmp.price * qty;
        ingredients.push({ ...tmp, qty });
      }
    }

    return {
      ...order,
      totalPrice,
      ingredients: ingredients as TOriginalIngredient[],
    };
  });
  ordersResult.sort(function (a: TWsOrderPrepared, b: TWsOrderPrepared) {
    return b.number - a.number;
  });

  return { ...feed, orders: ordersResult };
};
