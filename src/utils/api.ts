import { TCreateOrder } from "../types";

const API = "https://norma.nomoreparties.space/api";

class Api {
  static loadIngredients = () => {
    return new Promise((resolve, reject) => {
      fetch(`${API}/ingredients`)
        .then((response) => response.json())
        .catch(() => reject(false))
        .then((data) => resolve(data))
        .catch(() => reject(false));
    });
  };

  static createOrder = (order: TCreateOrder) => {
    return new Promise((resolve, reject) => {
      fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .catch(() => reject(false))
        .then((data) => resolve(data))
        .catch(() => reject(false));
    });
  };
}

export default Api;
