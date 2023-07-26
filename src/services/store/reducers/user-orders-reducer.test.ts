import {
  closeUserData,
  onConnectUserData,
  onLoadUserData,
} from "./user-orders-reducer";
import store from "../store";

const mockData = {
  success: true,
  orders: [
    {
      _id: "64c0996382e277001bfa4006",
      ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"],
      status: "done",
      name: "Краторный бургер",
      createdAt: "2023-07-26T03:56:19.281Z",
      updatedAt: "2023-07-26T03:56:19.431Z",
      number: 14387,
    },
    {
      _id: "64c0994d82e277001bfa4005",
      ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093d"],
      status: "done",
      name: "Флюоресцентный бургер",
      createdAt: "2023-07-26T03:55:57.060Z",
      updatedAt: "2023-07-26T03:55:57.236Z",
      number: 14386,
    },
    {
      _id: "64c0991682e277001bfa4004",
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0949",
        "643d69a5c3f7b9001cfa0948",
        "643d69a5c3f7b9001cfa0948",
        "643d69a5c3f7b9001cfa093d",
      ],
      status: "done",
      name: "Альфа-сахаридный флюоресцентный экзо-плантаго бургер",
      createdAt: "2023-07-26T03:55:02.059Z",
      updatedAt: "2023-07-26T03:55:02.222Z",
      number: 14385,
    },
  ],
  total: 14013,
  totalToday: 139,
};

describe("User Orders Reducer Test", () => {
  it("On connected", () => {
    store.dispatch(onConnectUserData(true));
    const result = store.getState().userOrders;
    expect(result.connected).toBe(true);
  });

  it("On disconnected", () => {
    store.dispatch(closeUserData());
    const result = store.getState().userOrders;
    expect(result.connected).toBe(false);
  });

  it("On load data", () => {
    store.dispatch(onLoadUserData(mockData));
    const result = store.getState().userOrders;
    expect(result.success).toBe(true);
    expect(result.total).toBe(14013);
    expect(result.totalToday).toBe(139);
    expect(result.orders.length).toBeGreaterThan(0);
  });
});
