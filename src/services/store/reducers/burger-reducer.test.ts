import {
  burgerAddIngredient,
  burgerClearIngredients,
  burgerLock,
  burgerRemoveIngredient,
  burgerSwapIngredients,
} from "./burger-reducer";
import store from "../store";

const mockData = [
  {
    id: "643d69a5cdfeb9001cfa0941",
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
    id: "643d69a5cdfeb9001cfa0141",
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
    id: "641d69a5cdfeb9001cfa0941",
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
    id: "643d61a5cdfeb9001cfa0941",
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

describe("Burger Reducer Test", () => {
  it("On add ingredient (bun)", () => {
    store.dispatch(burgerAddIngredient(mockData[0]));
    const result = store.getState().burger;
    expect(result.bun).toEqual(mockData[0]);
  });

  it("On add ingredients", () => {
    store.dispatch(burgerAddIngredient(mockData[1]));
    store.dispatch(burgerAddIngredient(mockData[2]));
    store.dispatch(burgerAddIngredient(mockData[3]));
    const result = store.getState().burger;
    expect(result.filling.length).toBe(3);
  });

  it("On burger lock", () => {
    store.dispatch(burgerLock());
    const result = store.getState().burger;
    expect(result.filling[0].locked).toBe(true);
    expect(result.filling[1].locked).toBe(true);
    expect(result.filling[2].locked).toBe(true);
  });

  it("On swap ingredient", () => {
    store.dispatch(burgerSwapIngredients({ first: 0, second: 1 }));
    const result = store.getState().burger;
    expect(result.filling[0].id).toBe(mockData[2].id);
    expect(result.filling[1].id).toBe(mockData[1].id);
  });

  it("On remove ingredient", () => {
    store.dispatch(burgerRemoveIngredient(mockData[1].id));
    const result = store.getState().burger;
    expect(result.filling.length).toBe(2);
  });

  it("On clear burger", () => {
    store.dispatch(burgerClearIngredients());
    const result = store.getState().burger;
    expect(result.bun).toBe(null);
    expect(result.filling.length).toBe(0);
  });
});
