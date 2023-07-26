import store from "../store";
import { orderClear } from "./order-reducer";

const mockData = {
  order: {
    success: true,
    name: "Space флюоресцентный бургер",
    order: {
      number: 4305,
    },
  },
  init: {
    name: "",
    order: {
      number: 0,
    },
    success: false,
    loading: false,
  },
};

describe("Order Reducer Test", () => {
  it("On order create", () => {
    store.dispatch({ type: "order/create/pending" });
    let result = store.getState().order;
    expect(result.loading).toBe(true);

    store.dispatch({ type: "order/create/rejected" });
    result = store.getState().order;
    expect(result.loading).toBe(false);
    expect(result.success).toBe(false);

    store.dispatch({
      type: "order/create/fulfilled",
      payload: mockData.order,
    });
    result = store.getState().order;
    expect(result).toEqual({ ...mockData.order, loading: false });
  });

  it("On clear order", () => {
    store.dispatch(orderClear());
    const result = store.getState().order;
    expect(result).toEqual(mockData.init);
  });
});
