import store from "../store";
import {
  ingredientCounterDec,
  ingredientCounterInc,
  ingredientsCountersReset,
} from "./ingredients-reducer";

const mockData = [
  {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa0942",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    __v: 0,
  },
];

describe("Ingredients Reducer Test", () => {
  it("On load ingredients", () => {
    store.dispatch({ type: "ingredients/loadIngredients/pending" });
    let result = store.getState().ingredients;
    expect(result.loading).toBe(true);

    store.dispatch({ type: "ingredients/loadIngredients/rejected" });
    result = store.getState().ingredients;
    expect(result.loading).toBe(false);
    expect(result.error).toBe(true);

    store.dispatch({
      type: "ingredients/loadIngredients/fulfilled",
      payload: { data: mockData, success: true },
    });
    result = store.getState().ingredients;
    expect(result.loading).toBe(false);
    expect(result.error).toBe(false);
    expect(result.ingredients).toEqual(
      mockData.map((item) => ({ ...item, include: 0 }))
    );
  });

  it("On ingredient counter increment", () => {
    store.dispatch(ingredientCounterInc(mockData[0]._id));
    store.dispatch(ingredientCounterInc(mockData[1]._id));
    const result = store.getState().ingredients;
    expect(result.ingredients[0].include).toBe(2);
    expect(result.ingredients[1].include).toBe(1);
  });

  it("On ingredient counter decrement", () => {
    store.dispatch(ingredientCounterDec(mockData[0]._id));
    store.dispatch(ingredientCounterDec(mockData[1]._id));
    const result = store.getState().ingredients;
    expect(result.ingredients[0].include).toBe(0);
    expect(result.ingredients[1].include).toBe(0);
  });

  it("On ingredient counter reset", () => {
    store.dispatch(ingredientCounterInc(mockData[0]._id));
    store.dispatch(ingredientCounterInc(mockData[1]._id));
    store.dispatch(ingredientsCountersReset());
    const result = store.getState().ingredients;
    expect(result.ingredients[0].include).toBe(0);
    expect(result.ingredients[1].include).toBe(0);
  });
});
